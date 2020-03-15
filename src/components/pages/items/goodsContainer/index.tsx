import React from "react";

import ItemElement from "./itemElement";
import { MainContainer } from "./styles";
import { IGoodsElement } from "../index";
import { IOrderData } from "utils/interfaces";

interface IProps {
  goods: IGoodsElement[];
  buyButtonHandler: (item: IOrderData) => void;
}

const GoodsContainer = ({ goods, buyButtonHandler }: IProps) => {
  return (
    <MainContainer>
      {goods.map(elem => (
        <ItemElement
          itemData={elem}
          buyButtonHandler={buyButtonHandler}
          key={elem.id}
        />
      ))}
    </MainContainer>
  );
};

export default GoodsContainer;
