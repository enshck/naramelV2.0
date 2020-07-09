import React from "react";

import { useSelector } from "customHooks/useSelector";
import {
  MainFiltersContainer,
  FilterValuesContainer,
  Button,
  PlusButtonContainer,
} from "./styles";
import { PlusButton } from "./editFiltersPopover/styles";
import { ReactComponent as EditIcon } from "assets/adminPanel/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/adminPanel/delete.svg";
import { ReactComponent as PlusIcon } from "assets/adminPanel/plus.svg";

interface IProps {
  filters: {
    [key: string]: string | string[];
  };
  ignoreFiltersList: string[];
  deleteFilter: (filterKey: string) => void;
  openEditPopoverHandler: (
    anchor: HTMLDivElement | null,
    filterId?: string
  ) => void;
}

const FiltersContainer = ({
  filters,
  ignoreFiltersList,
  deleteFilter,
  openEditPopoverHandler,
}: IProps) => {
  const filtersTypes = useSelector((state) => state.filters);

  return (
    <MainFiltersContainer>
      <h2>
        Фильтры
        <PlusButtonContainer
          onClick={(e) => openEditPopoverHandler(e.currentTarget)}
        >
          <PlusIcon />
        </PlusButtonContainer>
      </h2>
      {Object.keys(filters).map((filterKey) => {
        if (!ignoreFiltersList.includes(filterKey)) {
          const filterValues = filters[filterKey];
          const currentFilter = filtersTypes.find(
            (elem) => elem.type === filterKey
          );

          if (currentFilter) {
            const { name } = currentFilter;

            return (
              <li>
                {name}
                <Button
                  right={"-40px"}
                  onClick={(e) =>
                    openEditPopoverHandler(e.currentTarget, filterKey)
                  }
                >
                  <EditIcon />
                </Button>
                <Button right={"-80px"} onClick={() => deleteFilter(filterKey)}>
                  <DeleteIcon />
                </Button>
                <FilterValuesContainer>
                  {Array.isArray(filterValues) &&
                    filterValues.map((value) => <li>{value}</li>)}
                </FilterValuesContainer>
              </li>
            );
          }
        }
      })}
    </MainFiltersContainer>
  );
};

export default FiltersContainer;
