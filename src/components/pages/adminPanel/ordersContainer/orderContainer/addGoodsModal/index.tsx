import React, { useState, useEffect } from "react";

import { MainContainer, ContentContainer } from "./styles";
import FilterContainer from "./filterContainer";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IGoodsElement } from "components/pages/items";
import firebase from "utils/firebase";
interface IProps {
  open: boolean;
  onCloseAddGoodsModal: () => void;
}

const AddGoodsModal = ({ open, onCloseAddGoodsModal }: IProps) => {
  const [filterSearchValue, setFilterSearchValue] = useState<string>("");
  const [filteredGoodsData, setFilteredGoodsData] = useState<IGoodsElement[]>(
    []
  );
  const [{ data: goodsData }] = useAsyncMemo<IGoodsElement[]>(
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

  useEffect(() => {
    const lowerCaseSearchValue = filterSearchValue.toLowerCase();

    const filteredData = goodsData.filter((elem) => {
      const { name } = elem;
      const lowerCaseItemName = name.toLowerCase();

      return lowerCaseItemName.includes(lowerCaseSearchValue);
    });

    setFilteredGoodsData(filteredData);
  }, [filterSearchValue, goodsData]);

  return (
    <MainContainer
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={onCloseAddGoodsModal}
    >
      <ContentContainer>
        <FilterContainer
          filterSearchValue={filterSearchValue}
          setFilterSearchValue={setFilterSearchValue}
        />
      </ContentContainer>
    </MainContainer>
  );
};

export default AddGoodsModal;
