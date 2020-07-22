import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
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
  EmptyEditGoodsContainer,
} from "./styles";
import firebase from "utils/firebase";
import { IGoodsElement } from "components/pages/items";
import { debounce } from "utils/handlers";
import GoodsListContainer from "./goodsListContainer";
import EditGoodsContainer from "./editGoodsContainer";
import { useSelector } from "customHooks/useSelector";
import AddGoodsModal from "./addGoodsModal";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { getIdsForGoods, StatusType } from "axiosRequests/adminPanel";
import Loading from "components/spinner";

export interface IOption {
  label: string;
  value: string;
}

interface IRelatedOrderData {
  id: string;
  status: StatusType;
}

export interface IRelatedOrders {
  relatedOrders: {
    [key: string]: IRelatedOrderData[];
  };
}

const GoodsContainer = () => {
  const [isOpenAddGoodsModal, setOpenAddGoodsModal] = useState(false);
  const debounceForItemSearch = useCallback(debounce(800), []);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const { search } = history.location;
  const [goodsData, setGoodsData] = useState<IGoodsElement[]>([]);
  const goodsCategories = useSelector((state) => state.menuCategory);

  const [relatedGoods] = useAsyncMemo<IRelatedOrders>(
    async () => {
      const token = (await firebase.auth().currentUser?.getIdTokenResult())
        ?.token;
      return token
        ? getIdsForGoods(token)
        : new Promise((resolve) => {
            resolve({
              relatedGoods: {},
              relatedOrders: {},
            });
          });
    },
    [],
    {
      relatedOrders: {},
    }
  );
  const relatedGoodsData = relatedGoods.data;

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

  const addGoodsModalCloseHandler = () => {
    setOpenAddGoodsModal(false);
  };

  const deleteItemHandler = async (id: string) => {
    const changedItem = goodsData.find((elem) => elem.id === id);

    if (changedItem) {
      const refsOfImages: string[] = [];

      changedItem.subGoods.forEach((subItem) => {
        const { images } = subItem;

        images.forEach((elem) => {
          if (typeof elem === "string") {
            refsOfImages.push(elem);
          }
        });
      });

      await Promise.all(
        refsOfImages.map((elem) => firebase.storage().refFromURL(elem).delete())
      );

      await firebase.firestore().collection("goods").doc(id).delete();

      const updatedGoodsData: any = (
        await firebase.firestore().collection("goods").get()
      ).docs.map((elem) => elem.data());

      setGoodsData(updatedGoodsData);
    }
  };

  if (relatedGoods.pending) {
    return <Loading />;
  }

  return (
    <Fragment>
      <AddGoodsModal
        isOpen={isOpenAddGoodsModal}
        onClose={addGoodsModalCloseHandler}
        listOfGoodsCategory={listOfGoodsCategory}
        setGoodsData={setGoodsData}
      />
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
              setOpenAddGoodsModal={setOpenAddGoodsModal}
              deleteItemHandler={deleteItemHandler}
              relatedGoods={relatedGoodsData}
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
            <EmptyEditGoodsContainer>Выберите товар</EmptyEditGoodsContainer>
          )}
        </GridElement>
      </MainContainer>
    </Fragment>
  );
};

export default GoodsContainer;
