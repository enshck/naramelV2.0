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
        {Object.keys(filters).map((filter) => {
          const changedFilter = possibleFilters.find(
            (elem) => elem.type === filter
          );

          if (changedFilter) {
            const { id, name, units } = changedFilter;
            return (
              <li key={id}>
                <span>{name}</span>:{" "}
                {`${
                  Array.isArray(filters[filter])
                    ? filters[filter].join(", ")
                    : filters[filter]
                } ${units.length > 0 ? units + "." : ""}`}
              </li>
            );
          }
        })}
      </ItemFeatures>
    </MainContainer>
  );
};

export default LeftSideContainer;
