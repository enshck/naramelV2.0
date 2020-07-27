import React from "react";
import { useHistory } from "react-router-dom";

import {
  GoodsListContainer,
  GoodsListElement,
  ImageContainer,
  ElementInfo,
  AddItemButton,
  DeleteItemButton,
  RelatedOrdersContainer,
  RelatedOrdersElement,
  StyledOrderStatusContainer,
} from "./styles";
import { IGoodsElement } from "components/pages/items";
import defaultItemImage from "assets/goods/defaultImage.png";
import { ReactComponent as DeleteIcon } from "assets/adminPanel/delete.svg";
import { IRelatedOrders } from "./";
import { orderStatus } from "utils/constants";

interface IProps {
  filteredGoodsData: IGoodsElement[];
  changedItem: IGoodsElement | null;
  setOpenAddGoodsModal: (isOpenModal: boolean) => void;
  deleteItemHandler: (id: string) => void;
  relatedGoods: IRelatedOrders;
}

const GoodsList = ({
  filteredGoodsData,
  changedItem,
  setOpenAddGoodsModal,
  deleteItemHandler,
  relatedGoods,
}: IProps) => {
  const history = useHistory();
  const { relatedOrders } = relatedGoods;

  console.log(relatedGoods, "dat");

  return (
    <GoodsListContainer>
      {filteredGoodsData.map((elem) => {
        const { name, brand, subGoods, id } = elem;
        const [firstElementOfSubGoods] = subGoods;
        const { images } = firstElementOfSubGoods;
        const [mainImage] = images;

        const relatedOrdersForItem = relatedOrders[id];

        return (
          <GoodsListElement
            isChanged={Boolean(changedItem && changedItem.id === id)}
            onClick={() => history.push(`/adminPanel?id=${id}#3`)}
            key={id}
          >
            <ImageContainer>
              <img
                src={
                  mainImage
                    ? typeof mainImage === "string"
                      ? mainImage
                      : URL.createObjectURL(mainImage)
                    : defaultItemImage
                }
                alt={"itemImage"}
              />
            </ImageContainer>
            <ElementInfo>
              <h3>{name}</h3>
              <p>{brand}</p>
              <p>{id}</p>
            </ElementInfo>
            <DeleteItemButton onClick={() => deleteItemHandler(id)}>
              <DeleteIcon />
              <RelatedOrdersContainer
                onClick={(e) => e.stopPropagation()}
                isHidden={!relatedOrdersForItem}
              >
                {relatedOrdersForItem &&
                  relatedOrdersForItem.map((elem) => {
                    const { id, status } = elem;

                    return (
                      <RelatedOrdersElement
                        onClick={() => history.push(`/adminPanel?id=${id}#0`)}
                      >
                        <p>{id}</p>
                        <StyledOrderStatusContainer status={status}>
                          {orderStatus[status]}
                        </StyledOrderStatusContainer>
                      </RelatedOrdersElement>
                    );
                  })}
              </RelatedOrdersContainer>
            </DeleteItemButton>
          </GoodsListElement>
        );
      })}
      <AddItemButton onClick={() => setOpenAddGoodsModal(true)}>
        Новый товар
      </AddItemButton>
    </GoodsListContainer>
  );
};

export default GoodsList;
