import React, { useState, useMemo } from "react";
import { useSelector } from "customHooks/useSelector";

import {
  MainContainer,
  StyledExpansionPanel,
  StyledExpansionPanelDetails,
  StyledExpansionPanelSummary,
  CategoryName,
  CategoriesContainer,
  SubCategoriesContainer,
  SubCategoryElement,
} from "./styles";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IGoodsElement } from "components/pages/items";
import firebase from "utils/firebase";
import arrowDown from "assets/adminPanel/arrowDown.png";

const Categories = () => {
  const categoryData = useSelector((state) => state.menuCategory);
  const [expandedId, setExpandedId] = useState("");
  const [itemData] = useAsyncMemo<IGoodsElement[]>(
    () => {
      return firebase
        .firestore()
        .collection("goods")
        .get()
        .then((result) => result.docs.map((elem) => elem.data()));
    },
    [],
    []
  );
  const { data } = itemData;
  const countOfGoods = useMemo(() => {
    const countedData: { [key: string]: number } = {};

    data.forEach((elem) => {
      const { groupId } = elem;

      if (countedData[groupId]) {
        countedData[groupId]++;
      } else {
        countedData[groupId] = 1;
      }
    });

    return countedData;
  }, [data]);

  const expandedIdHandler = (id: string) => {
    if (expandedId === id) {
      setExpandedId("");
    } else {
      setExpandedId(id);
    }
  };

  return (
    <MainContainer>
      <CategoriesContainer>
        {categoryData.map((elem) => {
          const { id, name, subCategories } = elem;

          return (
            <StyledExpansionPanel
              square
              expanded={expandedId === id}
              onChange={() => expandedIdHandler(id)}
              key={id}
            >
              <StyledExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<img src={arrowDown} alt={"arrow"} />}
              >
                <CategoryName>
                  {name} <span>(ID: {id})</span>
                </CategoryName>
              </StyledExpansionPanelSummary>
              <StyledExpansionPanelDetails>
                <SubCategoriesContainer>
                  {subCategories.map((elem) => {
                    const { name, id } = elem;

                    return (
                      <SubCategoryElement>
                        {name} ({countOfGoods[id] || 0})
                      </SubCategoryElement>
                    );
                  })}
                </SubCategoriesContainer>
              </StyledExpansionPanelDetails>
            </StyledExpansionPanel>
          );
        })}
      </CategoriesContainer>
    </MainContainer>
  );
};

export default Categories;
