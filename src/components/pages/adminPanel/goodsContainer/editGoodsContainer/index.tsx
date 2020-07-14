import React, { useState, useEffect, BaseSyntheticEvent, useMemo } from "react";
import { cloneDeep } from "lodash";
import { v1 as uuidv1 } from "uuid";

import {
  MainContainer,
  SubmitContainer,
  SubmitButton,
  SpinnerMainContainer,
} from "./styles";
import { IGoodsElement } from "components/pages/items";
import { useSelector } from "customHooks/useSelector";
import { IOption } from "../";
import SubItemContainer from "./subItemsContainer";
import ItemForm from "./itemForm";
import { DropResult } from "react-beautiful-dnd";
import FiltersContainer from "./filtersContainer";
import EditFiltersPopover from "./editFiltersPopover";
import firebase from "utils/firebase";
import Spinner from "components/spinner";
import AddSubItemPopover from "./addSubItemPopover";
import { initialFilterValue } from "utils/constants";

interface IProps {
  changedItem: IGoodsElement;
  listOfGoodsCategory: IOption[];
  setGoodsData: (newValue: IGoodsElement[]) => void;
  isNewItem?: boolean;
  onClose?: () => void;
}

const EditGoodsContainer = ({
  changedItem,
  listOfGoodsCategory,
  setGoodsData,
  isNewItem,
  onClose,
}: IProps) => {
  const [isFetching, setFetching] = useState(false);
  const filtersTypes = useSelector((state) => state.filters);
  const [changedSubItemIndex, setChangedSubItemIndex] = useState(0);
  const [
    anchorForEditFilterPopover,
    setAnchorForEditFilterPopover,
  ] = useState<HTMLDivElement | null>(null);
  const [
    anchorForAddSubItemPopover,
    setAnchorForAddSubItemPopover,
  ] = useState<HTMLDivElement | null>(null);
  const [newSubItemIndex, setNewSubItemIndex] = useState<number>(0);
  const [editableFilterId, setEditableFilterId] = useState<string | null>(null);
  const [itemDataClone, setItemDataClone] = useState<IGoodsElement>(
    cloneDeep(changedItem)
  );
  const [itemDataCloneForEdit, setItemDataCloneForEdit] = useState<
    IGoodsElement
  >(cloneDeep(itemDataClone));

  const isValidForm = useMemo(() => {
    const {
      name,
      subGoods,
      brand,
      description,
      groupId,
      subName,
    } = itemDataClone;
    const { images } = subGoods[0];

    if (
      images.length > 0 &&
      name.length > 0 &&
      brand.length > 0 &&
      description.length > 0 &&
      groupId.length > 0 &&
      subName.length > 0
    ) {
      return true;
    }

    return false;
  }, [itemDataClone]);

  const ignoreFiltersListForEditPopover = useMemo(() => {
    const { filters } = itemDataCloneForEdit;
    return Object.keys(filters).map((elem) => elem);
  }, [itemDataCloneForEdit]);

  const { filters, subGoods } = itemDataClone;

  const changedFilter = useMemo(() => {
    const { subGoods } = itemDataClone;

    return (
      filtersTypes.find(
        (elem) => elem.type === subGoods[changedSubItemIndex].elementValue.type
      ) || {
        id: "",
        name: "",
        type: "",
        units: "",
      }
    );
  }, [changedSubItemIndex, filtersTypes, itemDataClone]);

  const ignoreFiltersList = useMemo(() => {
    const { subGoods } = itemDataClone;

    const ignoreList = ["brand", "price"];
    subGoods.forEach((elem) => {
      const { type } = elem.elementValue;

      if (!ignoreList.includes(type)) {
        ignoreList.push(type);
      }
    });

    return ignoreList;
  }, [itemDataClone]);

  useEffect(() => {
    const itemDataDeepClone = cloneDeep(itemDataClone);
    setItemDataCloneForEdit(itemDataDeepClone);
  }, [itemDataClone]);

  useEffect(() => {
    setItemDataClone(changedItem);
    setChangedSubItemIndex(0);
  }, [changedItem]);

  const onInputHandler = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;

    if (name === "brand") {
      setItemDataClone({
        ...itemDataClone,
        filters: {
          ...filters,
          brand: value,
        },
        brand: value,
      });
    } else {
      setItemDataClone({
        ...itemDataClone,
        [name]: value,
      });
    }
  };

  const onChangeGroup = (newValue: IOption) => {
    setItemDataClone({
      ...itemDataClone,
      groupId: newValue.value,
    });
  };

  const onChangeSubItemIndex = (newValue: IOption) => {
    const { value } = newValue;

    const findedIndex = subGoods.findIndex(
      (elem) => elem.elementValue.value === value
    );

    if (findedIndex === -1) {
      setChangedSubItemIndex(0);
    } else {
      setChangedSubItemIndex(findedIndex);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const cloneOfItemData = { ...itemDataClone };
    const { images } = cloneOfItemData.subGoods[changedSubItemIndex];
    const prevIndex = result.source.index;
    const nextIndex = result.destination.index;

    const [removed] = images.splice(prevIndex, 1);
    images.splice(nextIndex, 0, removed);

    setItemDataClone(cloneOfItemData);
  };

  const onChangeSubItemValue = (
    e: BaseSyntheticEvent,
    filterType: string,
    prevValue: string
  ) => {
    const cloneOfItemData = { ...itemDataClone };
    const { filters } = cloneOfItemData;
    const { elementValue } = cloneOfItemData.subGoods[changedSubItemIndex];
    elementValue.value = e.target.value;

    const changedFilter = filters[filterType];

    if (Array.isArray(changedFilter)) {
      if (filters[filterType]) {
        const indexOfElement = changedFilter.indexOf(prevValue);

        if (indexOfElement === -1) {
          filters[filterType] = [...changedFilter, e.target.value];
        } else {
          changedFilter[indexOfElement] = e.target.value;
        }
      } else {
        filters[filterType] = [e.target.value];
      }
    }

    setItemDataClone(cloneOfItemData);
  };

  const onChangeSubItemValueType = (
    newValue: IOption,
    prevOption: string,
    currentValue: string
  ) => {
    const cloneOfItemData = { ...itemDataClone };
    const { filters } = cloneOfItemData;
    const oldChangedFilter = filters[prevOption];

    const indexOfCurrentValue = oldChangedFilter.indexOf(currentValue);

    if (Array.isArray(oldChangedFilter)) {
      if (indexOfCurrentValue !== -1) {
        const { elementValue } = cloneOfItemData.subGoods[changedSubItemIndex];
        elementValue.type = newValue.value;

        oldChangedFilter.splice(indexOfCurrentValue, 1);

        if (filters[prevOption].length < 1) {
          delete filters[prevOption];
        }

        const newChangedFilter = filters[newValue.value];

        if (filters[newValue.value] && Array.isArray(newChangedFilter)) {
          filters[newValue.value] = [...newChangedFilter, currentValue];
        } else {
          filters[newValue.value] = [currentValue];
        }

        setItemDataClone(cloneOfItemData);
      }
    }
  };

  const setSubItemPrice = (e: BaseSyntheticEvent) => {
    const cloneOfItemData = { ...itemDataClone };

    if (changedSubItemIndex === 0) {
      cloneOfItemData.filters.price = e.target.value;
    }
    cloneOfItemData.subGoods[changedSubItemIndex].price = e.target.value;
    setItemDataClone(cloneOfItemData);
  };

  const deleteFilter = (filterKey: string) => {
    const cloneOfItemData = { ...itemDataClone };
    const { filters } = cloneOfItemData;

    delete filters[filterKey];

    setItemDataClone(cloneOfItemData);
  };

  const onCloseEditFilterPopover = () => {
    const itemDataDeepClone = cloneDeep(itemDataClone);

    setAnchorForEditFilterPopover(null);
    setEditableFilterId(null);
    setItemDataCloneForEdit(itemDataDeepClone);
  };

  const openEditPopoverHandler = (
    anchor: HTMLDivElement | null,
    filterId?: string
  ) => {
    if (filterId) {
      setEditableFilterId(filterId);
      setAnchorForEditFilterPopover(anchor);
    } else {
      const firstIdFilter = filtersTypes.find(
        (elem) => !ignoreFiltersListForEditPopover.includes(elem.type)
      )?.type;

      if (firstIdFilter) {
        setAnchorForEditFilterPopover(anchor);
        setEditableFilterId(firstIdFilter);
        const itemClone = { ...itemDataCloneForEdit };
        itemClone.filters[firstIdFilter] = [];

        setItemDataCloneForEdit(itemClone);
      }
    }
  };

  const uploadNewPictures = (e: BaseSyntheticEvent) => {
    const { files } = e.target;
    const cloneOfItemData = { ...itemDataClone };
    const { subGoods } = cloneOfItemData;
    const imagesOfChangedSubGoods = subGoods[changedSubItemIndex].images;

    subGoods[changedSubItemIndex].images = [
      ...imagesOfChangedSubGoods,
      ...files,
    ];

    setItemDataClone(cloneOfItemData);
  };

  interface IUploadPromisesData {
    promise: Promise<string>;
    subItemIndex: number;
    imagePosition: number;
  }

  const getPromiseOfUploadImage = (file: File) => {
    const uniqueId = uuidv1();

    return new Promise<string>((resolve, reject) => {
      const task = firebase.storage().ref(uniqueId).put(file);
      const taskProgress = (snapshot: any) => {};
      const taskError = reject;
      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then(resolve).catch(reject);
      };
      task.on("state_changed", taskProgress, taskError, taskCompleted);
    });
  };

  const submitHandler = async (itemDataClone: IGoodsElement) => {
    const cloneOfItemData = { ...itemDataClone };
    const { id } = itemDataClone;
    const { subGoods } = cloneOfItemData;
    const uploadPromises: IUploadPromisesData[] = [];

    console.log(cloneOfItemData, "itemitem");

    setFetching(true);

    try {
      subGoods.forEach((elem, subItemIndex) => {
        const { images } = elem;

        images.forEach((elem, imageItemIndex) => {
          if (typeof elem !== "string") {
            uploadPromises.push({
              promise: getPromiseOfUploadImage(elem),
              imagePosition: imageItemIndex,
              subItemIndex: subItemIndex,
            });
          }
        });
      });

      if (uploadPromises.length > 0) {
        const uploadedPictureUrls = await Promise.all(
          uploadPromises.map((item) => item.promise)
        );

        uploadPromises.forEach((elem, key) => {
          const { imagePosition, subItemIndex } = elem;
          cloneOfItemData.subGoods[subItemIndex].images[imagePosition] =
            uploadedPictureUrls[key];
        });

        setItemDataClone({
          ...cloneOfItemData,
        });
      }

      if (isNewItem) {
        const newItemId = uuidv1();

        await firebase
          .firestore()
          .collection("goods")
          .doc(newItemId)
          .set({
            ...itemDataClone,
            id: newItemId,
          });

        onClose && onClose();
      } else {
        await firebase
          .firestore()
          .collection("goods")
          .doc(id)
          .update({
            ...itemDataClone,
          });
      }

      updateGoodsData();
    } catch (err) {
      console.log(err);
    }

    setFetching(false);
  };

  const updateGoodsData = async () => {
    const updatedGoodsData: any = (
      await firebase.firestore().collection("goods").get()
    ).docs.map((elem) => elem.data());

    setGoodsData(updatedGoodsData);
  };

  const deleteItemImageHandler = async (imageIndex: number) => {
    const dataClone = { ...itemDataClone };
    const { subGoods, id } = dataClone;
    const changedImage = subGoods[changedSubItemIndex].images[imageIndex];

    try {
      if (typeof changedImage === "string") {
        await firebase.storage().refFromURL(changedImage).delete();
        subGoods[changedSubItemIndex].images.splice(imageIndex, 1);

        await firebase
          .firestore()
          .collection("goods")
          .doc(id)
          .update({
            ...dataClone,
          });

        setItemDataClone({
          ...dataClone,
        });
      } else {
        subGoods[changedSubItemIndex].images.splice(imageIndex, 1);
        setItemDataClone({
          ...dataClone,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onCloseAddSubItemPopover = () => {
    const dataClone = { ...itemDataCloneForEdit };

    setAnchorForAddSubItemPopover(null);
    dataClone.subGoods.splice(newSubItemIndex, 1);

    setItemDataCloneForEdit(dataClone);
    setNewSubItemIndex(0);
  };

  const onSubmitedCloseSubItemPopover = () => {
    setAnchorForAddSubItemPopover(null);
    setNewSubItemIndex(0);
  };

  const openAddSubItemPopover = (e: BaseSyntheticEvent) => {
    const dataClone = { ...itemDataCloneForEdit };

    setAnchorForAddSubItemPopover(e.currentTarget);

    dataClone.subGoods.push({
      elementValue: initialFilterValue,
      images: [],
      price: 0,
    });

    const newElementIndex = dataClone.subGoods.length - 1;

    setNewSubItemIndex(newElementIndex);
    setItemDataCloneForEdit(dataClone);
  };

  const deleteImagesHandler = async (refsOfImages: string[]) => {
    await Promise.all(
      refsOfImages.map((elem) => firebase.storage().refFromURL(elem).delete())
    );
  };

  const deleteSubItemHandler = async (index: number) => {
    const itemClone = { ...itemDataClone };
    const { subGoods, id } = itemClone;
    const { images } = subGoods[index];

    try {
      if (subGoods.length > 1) {
        setFetching(true);
        const refsOfImages: string[] = [];

        images.forEach((elem) => {
          if (typeof elem === "string") {
            refsOfImages.push(elem);
          }
        });

        await deleteImagesHandler(refsOfImages);
        subGoods.splice(index, 1);
        await firebase
          .firestore()
          .collection("goods")
          .doc(id)
          .update(itemClone);
        await updateGoodsData();

        setFetching(false);
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  if (isFetching) {
    return (
      <SpinnerMainContainer>
        <Spinner />
        <h3>Обновление товара. Не перезагружайте страницу</h3>
      </SpinnerMainContainer>
    );
  }

  return (
    <MainContainer>
      <AddSubItemPopover
        anchorEl={anchorForAddSubItemPopover}
        changedSubItemIndex={newSubItemIndex}
        closeHandler={onCloseAddSubItemPopover}
        itemDataCloneForEdit={itemDataCloneForEdit}
        setItemDataClone={setItemDataClone}
        setItemDataCloneForEdit={setItemDataCloneForEdit}
        onSubmitedCloseSubItemPopover={onSubmitedCloseSubItemPopover}
        updateGoodsData={updateGoodsData}
        submitHandler={submitHandler}
      />
      <EditFiltersPopover
        anchorEl={anchorForEditFilterPopover}
        closeHandler={onCloseEditFilterPopover}
        ignoreFiltersList={ignoreFiltersListForEditPopover}
        setItemDataClone={setItemDataClone}
        editableFilterId={editableFilterId}
        setEditableFilterId={setEditableFilterId}
        itemDataCloneForEdit={itemDataCloneForEdit}
        setItemDataCloneForEdit={setItemDataCloneForEdit}
      />
      <SubItemContainer
        changedFilter={changedFilter}
        changedSubItemIndex={changedSubItemIndex}
        onChangeSubItemIndex={onChangeSubItemIndex}
        subGoods={subGoods}
        onDragEnd={onDragEnd}
        onChangeSubItemValueType={onChangeSubItemValueType}
        onChangeSubItemValue={onChangeSubItemValue}
        setSubItemPrice={setSubItemPrice}
        uploadNewPictures={uploadNewPictures}
        deleteItemImageHandler={deleteItemImageHandler}
        itemDataClone={itemDataClone}
        deleteSubItemHandler={deleteSubItemHandler}
        openAddSubItemPopover={openAddSubItemPopover}
      />
      <ItemForm
        itemDataClone={itemDataClone}
        listOfGoodsCategory={listOfGoodsCategory}
        onChangeGroup={onChangeGroup}
        onInputHandler={onInputHandler}
      />
      <FiltersContainer
        filters={filters}
        ignoreFiltersList={ignoreFiltersList}
        deleteFilter={deleteFilter}
        openEditPopoverHandler={openEditPopoverHandler}
      />
      <SubmitContainer>
        <SubmitButton
          onClick={() => submitHandler(itemDataClone)}
          isBlocked={!isValidForm}
        >
          Обновить
        </SubmitButton>
      </SubmitContainer>
    </MainContainer>
  );
};

export default EditGoodsContainer;
