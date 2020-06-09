import React from "react";

import { MainContainer } from "./styles";
import { IGoodsElement } from "components/pages/items";

interface IProps {
  changedItem: IGoodsElement;
}

const EditGoodsContainer = ({ changedItem }: IProps) => {
  const {
    brand,
    description,
    filters,
    groupId,
    id,
    name,
    subGoods,
    subName,
  } = changedItem;

  return <MainContainer>{id}</MainContainer>;
};

export default EditGoodsContainer;
