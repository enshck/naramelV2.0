import React, {
  useState,
  useEffect,
  BaseSyntheticEvent,
  useCallback,
} from "react";

import { MainContainer, ContentContainer, EmptyContainer } from "./styles";
import FilterContainer from "./filterContainer";
import ItemsContainer from "./itemsContainer";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IGoodsElement } from "components/pages/items";
import firebase from "utils/firebase";
import { debounce } from "utils/handlers";
import { ICompletedOrderData } from "utils/interfaces";

interface IProps {
  open: boolean;
  onCloseAddGoodsModal: () => void;
  orderClone: ICompletedOrderData;
  setOrderClone: (newValue: ICompletedOrderData) => void;
}

const AddGoodsModal = ({
  open,
  onCloseAddGoodsModal,
  orderClone,
  setOrderClone,
}: IProps) => {
  const [filterSearchValue, setFilterSearchValue] = useState<string>("");
  const debounceForItemSearch = useCallback(debounce(800), []);
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

  const setFilterValueHandler = (e: BaseSyntheticEvent) => {
    const value = e.target.value;

    debounceForItemSearch(() => setFilterSearchValue(value));
  };

  const addItemHandler = (item: IGoodsElement, subItemIndex: number) => {
    const cloneOfOrdersData = {
      ...orderClone,
    };
    const { ordersData } = cloneOfOrdersData;
    const changedSubItem = item.subGoods[subItemIndex];
    const alreadyCreatedOrderElement = ordersData.find(
      (elem) =>
        elem.id === item.id &&
        elem.elementValue.value === changedSubItem.elementValue.value
    );

    if (alreadyCreatedOrderElement) {
      alreadyCreatedOrderElement.count++;
    } else {
      cloneOfOrdersData.ordersData.push({
        id: item.id,
        name: item.name,
        price: changedSubItem.price,
        images: changedSubItem.images.map((elem) => elem as string),
        elementValue: changedSubItem.elementValue,
        count: 1,
      });
    }

    setOrderClone(cloneOfOrdersData);
    onCloseAddGoodsModal();
  };

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
          setFilterValueHandler={setFilterValueHandler}
        />
        {filteredGoodsData.length > 0 ? (
          <ItemsContainer
            filteredGoodsData={filteredGoodsData}
            addItemHandler={addItemHandler}
          />
        ) : (
          <EmptyContainer>Ничего не найдено</EmptyContainer>
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default AddGoodsModal;
