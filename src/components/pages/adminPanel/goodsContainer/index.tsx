import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

import Input from "components/inputs";
import {
  MainContainer,
  GridElement,
  ItemsContainer,
  SearchContainer,
  StyledInput,
  StyledSearchLabel,
} from "./styles";
import firebase from "utils/firebase";
import { IGoodsElement } from "components/pages/items";
import { debounce } from "utils/handlers";
import GoodsListContainer from "./goodsListContainer";
import EditGoodsContainer from "./editGoodsContainer";
import { useSelector } from "customHooks/useSelector";

export interface IOption {
  label: string;
  value: string;
}

const GoodsContainer = () => {
  const debounceForItemSearch = useCallback(debounce(800), []);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const { search } = history.location;
  const [goodsData, setGoodsData] = useState<IGoodsElement[]>([]);
  const goodsCategories = useSelector((state) => state.menuCategory);

  const listOfGoodsCategory = useMemo(() => {
    const goodsCategory: IOption[] = [];
    goodsCategories.forEach((category) => {
      const { subCategories } = category;
      subCategories.forEach((subCategory) =>
        goodsCategory.push({
          label: subCategory.name,
          value: subCategory.id,
        })
      );
    });

    return goodsCategory;
  }, [goodsCategories]);

  useEffect(() => {
    const effectHandler = async () => {
      const goodsData: any[] = (
        await firebase.firestore().collection("goods").get()
      ).docs.map((elem) => elem.data());

      setGoodsData(goodsData);
    };
    effectHandler();
  }, []);

  const filteredGoodsData = useMemo(() => {
    if (searchValue.length > 0) {
      const goodsDataClone: IGoodsElement[] = [...goodsData];
      const searchValueLowerCase = searchValue.toLowerCase();

      return goodsDataClone.filter((elem) => {
        const idLowerCase = elem.id.toLowerCase();
        const nameLowerCase = elem.name.toLowerCase();
        return (
          idLowerCase.includes(searchValueLowerCase) ||
          nameLowerCase.includes(searchValueLowerCase)
        );
      });
    }

    return goodsData;
  }, [goodsData, searchValue]);

  const changedItem = useMemo(() => {
    const { id } = qs.parse(search.slice(1));
    const changedItemData = filteredGoodsData.find((elem) => elem.id === id);

    if (!changedItemData) {
      return null;
    }

    return changedItemData;
  }, [filteredGoodsData, search]);

  console.log(listOfGoodsCategory, "cat");

  return (
    <MainContainer>
      <GridElement>
        <ItemsContainer>
          <SearchContainer>
            <StyledSearchLabel htmlFor={"searchValue"}>
              Поиск по ID или имени товара
            </StyledSearchLabel>
            <Input
              StyledComponent={StyledInput}
              name={"searchValue"}
              type={"text"}
              defaultValue={searchValue}
              onInput={(e) => {
                const value = e.target.value;

                debounceForItemSearch(() => setSearchValue(value));
              }}
            />
          </SearchContainer>
          <GoodsListContainer
            filteredGoodsData={filteredGoodsData}
            changedItem={changedItem}
          />
        </ItemsContainer>
      </GridElement>
      <GridElement>
        {changedItem ? (
          <EditGoodsContainer
            changedItem={changedItem}
            listOfGoodsCategory={listOfGoodsCategory}
            setGoodsData={setGoodsData}
          />
        ) : (
          <h1>Выберите товар</h1>
        )}
      </GridElement>
    </MainContainer>
  );
};

export default GoodsContainer;
