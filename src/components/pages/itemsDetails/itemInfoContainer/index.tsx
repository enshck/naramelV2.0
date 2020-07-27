import React from "react";

import { MainContainer, ItemName, SubName, ItemFeatures } from "./styles";
import { IGoodsElement } from "components/pages/items";
import { IFilter } from "utils/interfaces";

interface IProps extends IGoodsElement {
  possibleFilters: IFilter[];
}

const LeftSideContainer = ({
  name,
  subName,
  possibleFilters,
  filters,
}: IProps) => {
  return (
    <MainContainer>
      <ItemName>{name}</ItemName>
      <SubName>{subName}</SubName>
      <ItemFeatures>
        {Object.keys(filters).map((filterKey) => {
          const changedFilter = possibleFilters.find(
            (elem) => elem.type === filterKey
          );
          const filter = filters[filterKey];

          if (changedFilter) {
            const { id, name, units } = changedFilter;
            return (
              <li key={id}>
                <span>{name}</span>:{" "}
                {`${Array.isArray(filter) ? filter.join(", ") : filter} ${
                  units.length > 0 ? units + "." : ""
                }`}
              </li>
            );
          }
        })}
      </ItemFeatures>
    </MainContainer>
  );
};

export default LeftSideContainer;
