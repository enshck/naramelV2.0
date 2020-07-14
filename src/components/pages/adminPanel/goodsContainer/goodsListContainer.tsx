import React from "react";
import { useHistory } from "react-router-dom";

import {
  GoodsListContainer,
  GoodsListElement,
  ImageContainer,
  ElementInfo,
  AddItemButton,
} from "./styles";
import { IGoodsElement } from "components/pages/items";
import defaultItemImage from "assets/goods/defaultImage.png";

interface IProps {
  filteredGoodsData: IGoodsElement[];
  changedItem: IGoodsElement | null;
  setOpenAddGoodsModal: (isOpenModal: boolean) => void;
}

const GoodsList = ({
  filteredGoodsData,
  changedItem,
  setOpenAddGoodsModal,
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
