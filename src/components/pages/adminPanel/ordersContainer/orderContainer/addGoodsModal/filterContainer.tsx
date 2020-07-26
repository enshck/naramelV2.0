import React, { BaseSyntheticEvent } from "react";

import { FilterMainContainer, StyledInput, StyledLabel } from "./styles";
import Input from "components/inputs";

interface IProps {
  filterSearchValue: string;
  setFilterValueHandler: (e: BaseSyntheticEvent) => void;
}

const FilterContainer = ({
  filterSearchValue,
  setFilterValueHandler,
}: IProps) => {
  return (
    <FilterMainContainer>
      <StyledLabel htmlFor={"filterSearchValue"}>
        Поиск по имени товарам
      </StyledLabel>
      <Input
        StyledComponent={StyledInput}
        name={"filterSearchValue"}
        type={"text"}
        defaultValue={filterSearchValue}
        onInput={setFilterValueHandler}
      />
    </FilterMainContainer>
  );
};

export default FilterContainer;
