import React from "react";

import { ItemsListContainer } from "../styles";
import { IGoodsElement } from "components/pages/items";
import ItemElement from "./itemElement";

interface IProps {
  filteredGoodsData: IGoodsElement[];
  addItemHandler: (item: IGoodsElement, subItemIndex: number) => void;
}
const ItemsList = ({ filteredGoodsData, addItemHandler }: IProps) => (
  <ItemsListContainer>
    {filteredGoodsData.map((elem) => (
      <ItemElement itemData={elem} addItemHandler={addItemHandler} />
    ))}
  </ItemsListContainer>
);

export default ItemsList;
