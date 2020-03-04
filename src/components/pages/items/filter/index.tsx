import React from "react";
import { useSelector } from "react-redux";

import {
  MainContainer,
  FilterElement,
  CheckboxContainer,
  Label
} from "./styles";
import { IFiltersData, IFilterData } from "../index";
import Spinner from "components/spinner";
import { IFiltersReducers, IFilter } from "utils/interfaces";
import Input from "components/inputs";
import { FilterStyledCheckbox } from "utils/styles";

interface IProps {
  filtersData: IFiltersData;
  isFetchingFilter: boolean;
  filterData: IFilterData;
  onChangeFilterHandler: (filterKey: string, value: string) => void;
}

const Filter = ({
  filtersData,
  isFetchingFilter,
  filterData,
  onChangeFilterHandler
}: IProps) => {
  const filters = useSelector<IFiltersReducers, IFilter[]>(
    state => state.filters
  );

  if (isFetchingFilter) {
    return <Spinner />;
  }
  return (
    <MainContainer>
      {Object.keys(filtersData).map((filterKey, key) => {
        const translatedNameOfFilter = filters.find(
          elem => elem.type === filterKey
        );
        const filterElementArray = filtersData[filterKey];
        if (translatedNameOfFilter) {
          return (
            <FilterElement key={key}>
              <h2>{translatedNameOfFilter.name}</h2>
              {filterElementArray.map((elem, key) => {
                const { value, count } = elem;
                const filterElement = filterData[filterKey];

                return (
                  <CheckboxContainer key={key}>
                    <Input
                      type={"checkbox"}
                      name={`${filterKey}-${value}`}
                      onChange={() => onChangeFilterHandler(filterKey, value)}
                      StyledComponent={FilterStyledCheckbox}
                      checked={filterElement && filterElement.includes(value)}
                    />
                    <Label htmlFor={`${filterKey}-${value}`}>
                      {value} <span>({count})</span>
                    </Label>
                  </CheckboxContainer>
                );
              })}
            </FilterElement>
          );
        }
      })}
    </MainContainer>
  );
};

export default Filter;
