import React from "react";

import ItemElement from "./itemElement";
import { MainContainer } from "./styles";
import { IGoodsElement } from "../index";

interface IProps {
  goods: IGoodsElement[];
}

const GoodsContainer = ({ goods }: IProps) => {
  return (
    <MainContainer>
      {goods.map(elem => (
        <ItemElement {...elem} key={elem.id} />
      ))}
    </MainContainer>
  );
};

export default GoodsContainer;
