import React, { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { IProfile } from "utils/interfaces";
import firebase from "utils/firebase";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IGoodsElement, ISubGoodsElement } from "components/pages/items";
import {
  MainContentContainer,
  MainContainer,
  GridColumn,
  SliderContainer,
  DescriptionMainContainer,
  DescriptionGridContainer,
} from "./styles";
import { IOption } from "components/inputs/dynamicSearch";
import { useSelector } from "customHooks/useSelector";
import Slider from "./slider";
import ItemInfoContainer from "./itemInfoContainer";
import ControlsContainer from "./controlsContainer";
import { itemHandler } from "utils/handlers";
import { setOrdersData, setOpenedModal } from "store/actions";

interface IProps {
  match: {
    params: {
      id: string;
    };
  };
  profile: IProfile;
}

const ItemsDetail = (props: IProps) => {
  const { match } = props;
  const { id } = match.params;
  const [itemData] = useAsyncMemo<IGoodsElement>(
    () => {
      return firebase
        .firestore()
        .collection("goods")
        .where("id", "==", id)
        .get()
        .then((result) => result.docs[0].data());
    },
    [id],
    {
      brand: "",
      description: "",
      groupId: "",
      id: "",
      name: "",
      subName: "",
      filters: {},
      subGoods: [],
    }
  );

  const { subGoods, name, description } = itemData.data;
  const filters = useSelector((state) => state.filters);
  const ordersData = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [changedSubElement, setChangedSubElement] = useState<ISubGoodsElement>({
    elementValue: {
      type: "",
      value: "",
    },
    images: [],
    price: 0,
  });
  const { elementValue, images, price } = changedSubElement;

  const optionsForSelector = useMemo(
    () =>
      subGoods.map((elem) => {
        const { value, type } = elem.elementValue;
        const changedFilterType = filters.find((elem) => elem.type === type);

        return {
          label: `${value} ${changedFilterType?.units || ""}`,
          value,
        };
      }),
    [subGoods, filters]
  );
  const changedValueSelector = useMemo(() => {
    const value = elementValue.value;
    const changedFilterType = filters.find(
      (elem) => elem.type === elementValue.type
    );

    return {
      label: `${value} ${changedFilterType?.units || ""}`,
      value: `${value}`,
    };
  }, [changedSubElement, filters]);

  useEffect(() => {
    if (subGoods.length >= 1) {
      setChangedSubElement(subGoods[0]);
    }
  }, [subGoods]);

  const changeSubElement = (newValue: IOption) => {
    const changedElement = subGoods.find(
      (elem) => elem.elementValue.value === newValue.value
    );

    if (changedElement) {
      setChangedSubElement(changedElement);
    }
  };

  const submitHandler = () => {
    const item = {
      ...itemData.data,
      ...changedSubElement,
    };
    delete item.subGoods;
    itemHandler({
      ordersData: ordersData.length > 0 ? ordersData : null,
      item,
      setDataToStateHandler: (newData) => dispatch(setOrdersData(newData)),
    });
    dispatch(setOpenedModal("orders"));
  };

  return (
    <MainContentContainer>
      <MainContainer>
        <GridColumn>
          <ItemInfoContainer {...itemData.data} possibleFilters={filters} />
        </GridColumn>
        <GridColumn>
          <SliderContainer>
            <Slider images={images} />
          </SliderContainer>
        </GridColumn>
        <GridColumn>
          <ControlsContainer
            changeSubElement={changeSubElement}
            changedValueSelector={changedValueSelector}
            optionsForSelector={optionsForSelector}
            price={price}
            id={id}
            submitHandler={submitHandler}
          />
        </GridColumn>
      </MainContainer>
      <DescriptionMainContainer>
        <h1>Описание {name}</h1>
        <DescriptionGridContainer>{description}</DescriptionGridContainer>
      </DescriptionMainContainer>
    </MainContentContainer>
  );
};

export default ItemsDetail;
