import React from "react";

import { FilterMainContainer, StyledInput } from "./styles";
import Input from "components/inputs";

interface IProps {
  filterSearchValue: string;
  setFilterSearchValue: (newValue: string) => void;
}

const FilterContainer = ({
  filterSearchValue,
  setFilterSearchValue,
}: IProps) => {
  return (
    <FilterMainContainer>
      <Input
        StyledComponent={StyledInput}
        name={"filterSearchValue"}
        type={"text"}
        value={filterSearchValue}
        onInput={(e) => setFilterSearchValue(e.target.value)}
      />
    </FilterMainContainer>
  );
};

export default FilterContainer;
