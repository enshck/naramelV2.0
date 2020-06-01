import React, { useState, useMemo, BaseSyntheticEvent, Fragment } from "react";
import { useDispatch } from "react-redux";
import { v1 as uuidv1 } from "uuid";
import { useHistory } from "react-router-dom";
import qs from "qs";

import { useSelector } from "customHooks/useSelector";
import {
  MainContainer,
  StyledExpansionPanel,
  StyledExpansionPanelDetails,
  StyledExpansionPanelSummary,
  CategoryName,
  CategoriesContainer,
  SubCategoriesContainer,
  SubCategoryElement,
  Button,
  PlusCategoryIconContainer,
  AddCategoryButton,
  StyledTooltip,
  CountOfGoodsContainer,
  TooltipElement,
  StyledOrderStatusContainer,
} from "./styles";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IGoodsElement } from "components/pages/items";
import firebase from "utils/firebase";
import { ISubCategory } from "utils/interfaces";
import arrowDown from "assets/adminPanel/arrowDown.png";
import { ReactComponent as EditIcon } from "assets/adminPanel/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/adminPanel/delete.svg";
import { setMenuItems } from "store/actions";
import EditNamePopover from "./editNamePopover";
import { ReactComponent as PlusIcon } from "assets/adminPanel/plus.svg";
import { getIdsForCategories, deleteGoods } from "axiosRequests/adminPanel";
import { orderStatus } from "utils/constants";

interface IRelatedOrderData {
  id: string;
  status: "ordered" | "accepted" | "delivered" | "cancelled";
}

interface IRelatedGoodsAndOrders {
  relatedGoods: {
    [key: string]: string[];
  };
  relatedOrders: {
    [key: string]: IRelatedOrderData[];
  };
}

const Categories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categoryData = useSelector((state) => state.menuCategory);
  const [expandedId, setExpandedId] = useState("");
  const [
    anchorForNamePopover,
    setAnchorForNamePopover,
  ] = React.useState<HTMLDivElement | null>(null);
  const [editableCategoryId, setEditableCategoryId] = useState("");
  const [editableSubCategoryId, setEditableSubCategoryId] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [popoverEditMode, setPopoverEditMode] = useState("");
  const [relatedGoodsAndOrders] = useAsyncMemo<IRelatedGoodsAndOrders>(
    async () => {
      const token = (await firebase.auth().currentUser?.getIdTokenResult())
        ?.token;
      return token
        ? getIdsForCategories(token)
        : new Promise((resolve) => {
            resolve({
              relatedGoods: {},
              relatedOrders: {},
            });
          });
    },
    [categoryData],
    {
      relatedGoods: {},
      relatedOrders: {},
    }
  );
  const { relatedGoods, relatedOrders } = relatedGoodsAndOrders.data;

  const updateCategoriesData = async () => {
    const newCategoriesDataDocs = await firebase
      .firestore()
      .collection("category")
      .get();
    const newCategoryData: any = newCategoriesDataDocs.docs.map((elem) =>
      elem.data()
    );
    dispatch(setMenuItems(newCategoryData));
  };

  const expandedIdHandler = (id: string) => {
    if (expandedId === id) {
      setExpandedId("");
    } else {
      setExpandedId(id);
    }
  };

  const deleteCategoryHandler = async (e: BaseSyntheticEvent, id: string) => {
    // delete category with related subcategories and goods

    e.stopPropagation();
    try {
      const changedCategoryData: any = (
        await firebase.firestore().collection("category").doc(id).get()
      ).data();
      const relatedGoodsIdArray: string[] = changedCategoryData.subCategories.map(
        (elem: ISubCategory) => elem.id
      );
      if (relatedGoodsIdArray.length > 0) {
        const token =
          (await firebase.auth().currentUser?.getIdTokenResult())?.token ||
          null;
        const relatedGoods = (
          await firebase
            .firestore()
            .collection("goods")
            .where("groupId", "in", relatedGoodsIdArray)
            .get()
        ).docs.map((elem) => elem.data().id);

        await deleteGoods(
          {
            goodsIds: relatedGoods,
          },
          token
        );
      }
      await firebase.firestore().collection("category").doc(id).delete();
      updateCategoriesData();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const deleteSubcategoryHandler = async (
    idSubCategory: string,
    idCategory: string
  ) => {
    // delete subCategory with related goods
    try {
      const token =
        (await firebase.auth().currentUser?.getIdTokenResult())?.token || null;
      const relatedGoods = (
        await firebase
          .firestore()
          .collection("goods")
          .where("groupId", "==", idSubCategory)
          .get()
      ).docs.map((elem) => elem.data().id);

      await deleteGoods(
        {
          goodsIds: relatedGoods,
        },
        token
      );
      const changedCategoryData: any = (
        await firebase.firestore().collection("category").doc(idCategory).get()
      ).data();
      const subCategories: ISubCategory[] = changedCategoryData.subCategories;
      const changedSubCategoryIndex = subCategories.findIndex(
        (elem) => elem.id === idSubCategory
      );
      subCategories.splice(changedSubCategoryIndex, 1);
      await firebase.firestore().collection("category").doc(idCategory).update({
        subCategories,
      });
      updateCategoriesData();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const onCloseEditNamePopover = () => {
    setAnchorForNamePopover(null);
    setEditableCategoryId("");
    setEditableSubCategoryId("");
    setPopoverEditMode("");
    setEditInputValue("");
  };

  interface IOpenEditPopoverData {
    e: BaseSyntheticEvent;
    editMode: string;
    idCategory?: string;
    idSubcategory?: string;
  }

  const openEditPopover = ({
    e,
    editMode,
    idCategory,
    idSubcategory,
  }: IOpenEditPopoverData) => {
    e.stopPropagation();
    setAnchorForNamePopover(e.currentTarget);
    setPopoverEditMode(editMode);
    if (idCategory) {
      setEditableCategoryId(idCategory);
    }
    if (idSubcategory) {
      setEditableSubCategoryId(idSubcategory);
    }
    const changedCategory = categoryData.find((elem) => elem.id === idCategory);
    if (editMode === "category") {
      setEditInputValue(changedCategory?.name || "");
    } else if (editMode === "subCategory") {
      const changedSubCategory = changedCategory?.subCategories.find(
        (elem) => elem.id === idSubcategory
      );
      setEditInputValue(changedSubCategory?.name || "");
    }
  };

  const popoverSubmitHandler = async () => {
    if (editInputValue.length > 0) {
      if (popoverEditMode === "category") {
        if (editableCategoryId) {
          // update category
          await firebase
            .firestore()
            .collection("category")
            .doc(editableCategoryId)
            .update({
              name: editInputValue,
            });

          updateCategoriesData();
          onCloseEditNamePopover();
        } else {
          // add new category
          const uniqueCategoryId = uuidv1();

          try {
            await firebase
              .firestore()
              .collection("category")
              .doc(uniqueCategoryId)
              .set({
                id: uniqueCategoryId,
                name: editInputValue,
                subCategories: [],
              });
            updateCategoriesData();
            onCloseEditNamePopover();
          } catch (err) {
            console.log(err, "error");
          }
        }
      } else if (popoverEditMode === "subCategory") {
        if (editableSubCategoryId) {
          // update subcategory
          const changedCategory = categoryData.find(
            (elem) => elem.id === editableCategoryId
          );
          const changedSubCategoryesClone = [
            ...(changedCategory?.subCategories || []),
          ];
          const changedSubCategory = changedSubCategoryesClone.find(
            (elem) => elem.id === editableSubCategoryId
          );
          if (changedSubCategory) {
            changedSubCategory.name = editInputValue;
            await firebase
              .firestore()
              .collection("category")
              .doc(editableCategoryId)
              .update({
                subCategories: changedSubCategoryesClone,
              });
            updateCategoriesData();
            onCloseEditNamePopover();
          }
        } else {
          // add new subcategory

          const uniqueCategoryId = uuidv1();

          try {
            const changedCategory = categoryData.find(
              (elem) => elem.id === editableCategoryId
            );
            const changedSubCategoryesClone = [
              ...(changedCategory?.subCategories || []),
            ];
            changedSubCategoryesClone.push({
              id: uniqueCategoryId,
              name: editInputValue,
            });
            await firebase
              .firestore()
              .collection("category")
              .doc(editableCategoryId)
              .update({
                subCategories: changedSubCategoryesClone,
              });
            updateCategoriesData();
            onCloseEditNamePopover();
          } catch (err) {
            console.log(err, "error");
          }
        }
      }
    }
  };

  return (
    <MainContainer>
      <EditNamePopover
        anchorEl={anchorForNamePopover}
        closeHandler={onCloseEditNamePopover}
        popoverSubmitHandler={popoverSubmitHandler}
        editInputValue={editInputValue}
        setEditInputValue={setEditInputValue}
        editableCategoryId={editableCategoryId}
        popoverEditMode={popoverEditMode}
      />
      <CategoriesContainer>
        {categoryData.map((elem) => {
          const { name, subCategories } = elem;
          const idCategory = elem.id;

          return (
            <StyledExpansionPanel
              square
              expanded={expandedId === idCategory}
              onChange={() =>
                subCategories.length > 0 && expandedIdHandler(idCategory)
              }
              key={idCategory}
            >
              <StyledExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<img src={arrowDown} alt={"arrow"} />}
              >
                <CategoryName>
                  {name} - <span>{subCategories.length} подкатегорий</span>{" "}
                </CategoryName>
                {expandedId !== idCategory && (
                  <Fragment>
                    <Button
                      right={"120px"}
                      style={{ padding: "6px" }}
                      onClick={(e) =>
                        openEditPopover({
                          e,
                          editMode: "subCategory",
                          idCategory,
                        })
                      }
                    >
                      <PlusIcon />
                    </Button>
                    <Button
                      right={"80px"}
                      onClick={(e) =>
                        openEditPopover({
                          e,
                          editMode: "category",
                          idCategory,
                        })
                      }
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      right={"40px"}
                      onClick={(e) => deleteCategoryHandler(e, idCategory)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Fragment>
                )}
              </StyledExpansionPanelSummary>
              <StyledExpansionPanelDetails>
                <SubCategoriesContainer>
                  {subCategories.map((elem) => {
                    const { name, id } = elem;

                    return (
                      <SubCategoryElement>
                        {name}
                        <CountOfGoodsContainer>
                          <span>
                            -{(relatedGoods[id] || []).length} товар(ов)
                          </span>
                          <StyledTooltip isEmpty={!Boolean(relatedGoods[id])}>
                            {relatedGoods[id] &&
                              relatedGoods[id].map((elem) => {
                                return (
                                  <TooltipElement
                                    onClick={() =>
                                      history.push(`/adminPanel?id=${elem}#3`)
                                    }
                                  >
                                    {elem}
                                  </TooltipElement>
                                );
                              })}
                          </StyledTooltip>
                        </CountOfGoodsContainer>
                        <CountOfGoodsContainer>
                          <span>
                            -{(relatedOrders[id] || []).length} заказ(ов)
                          </span>
                          <StyledTooltip isEmpty={!Boolean(relatedOrders[id])}>
                            {relatedOrders[id] &&
                              relatedOrders[id].map((elem) => {
                                const { id, status } = elem;
                                return (
                                  <TooltipElement
                                    onClick={() =>
                                      history.push(`/adminPanel?id=${id}#0`)
                                    }
                                  >
                                    {id}
                                    <StyledOrderStatusContainer status={status}>
                                      {orderStatus[status]}
                                    </StyledOrderStatusContainer>
                                  </TooltipElement>
                                );
                              })}
                          </StyledTooltip>
                        </CountOfGoodsContainer>
                        <Button
                          right={"50px"}
                          onClick={(e) =>
                            openEditPopover({
                              e,
                              editMode: "subCategory",
                              idCategory,
                              idSubcategory: id,
                            })
                          }
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          right={"10px"}
                          onClick={(e) =>
                            deleteSubcategoryHandler(id, idCategory)
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </SubCategoryElement>
                    );
                  })}
                </SubCategoriesContainer>
              </StyledExpansionPanelDetails>
            </StyledExpansionPanel>
          );
        })}
      </CategoriesContainer>
      <PlusCategoryIconContainer
        onClick={(e) =>
          openEditPopover({
            e,
            editMode: "category",
          })
        }
      >
        <PlusIcon />
      </PlusCategoryIconContainer>
    </MainContainer>
  );
};

export default Categories;
