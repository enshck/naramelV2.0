import React from "react";
import { useHistory } from "react-router-dom";

import {
  GoodsListContainer,
  GoodsListElement,
  ImageContainer,
  ElementInfo,
  AddItemButton,
  DeleteItemButton,
} from "./styles";
import { IGoodsElement } from "components/pages/items";
import defaultItemImage from "assets/goods/defaultImage.png";
import { ReactComponent as DeleteIcon } from "assets/adminPanel/delete.svg";

interface IProps {
  filteredGoodsData: IGoodsElement[];
  changedItem: IGoodsElement | null;
  setOpenAddGoodsModal: (isOpenModal: boolean) => void;
  deleteItemHandler: (id: string) => void;
}

const GoodsList = ({
  filteredGoodsData,
  changedItem,
  setOpenAddGoodsModal,
  deleteItemHandler,
}: IProps) => {
  const history = useHistory();

  return (
    <GoodsListContainer>
      {filteredGoodsData.map((elem) => {
        const { name, brand, subGoods, id } = elem;
        const [firstElementOfSubGoods] = subGoods;
        const { images } = firstElementOfSubGoods;
        const [mainImage] = images;

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
