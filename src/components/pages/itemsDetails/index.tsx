import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";

import { IProfile } from "utils/interfaces";
import firebase from "utils/firebase";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IGoodsElement, ISubGoodsElement } from "components/pages/items";
import {
  MainContainer,
  GridColumn,
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
  ControlsContainer,
} from "./styles";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { IOption } from "components/inputs/dynamicSearch";
import { useSelector } from "customHooks/useSelector";

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
      name: "qwe",
      subName: "",
      filters: {},
      subGoods: [],
    }
  );

  const {
    brand,
    description,
    groupId,
    name,
    subGoods,
    subName,
  } = itemData.data;
  const filters = useSelector((state) => state.filters);
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

  console.log(changedSubElement, ">>>");

  return (
    <MainContainer>
      <GridColumn>{name}</GridColumn>
      <GridColumn></GridColumn>
      <GridColumn>
        <ControlsContainer>
          <h2>{price}</h2>
          <Selector
            StyledInputContainer={StyledSelectorInput}
            StyledOptionContainer={StyledSelectorOptions}
            StyledOption={StyledSelectorOption}
            options={optionsForSelector}
            changedValue={changedValueSelector}
            setNewValue={changeSubElement}
            arrowIcon={arrowDown}
          />
        </ControlsContainer>
      </GridColumn>
      {/* <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header mode={"singleItem"} />
      <ItemsDetailContainer changedProduct={changedProduct} /> */}
    </MainContainer>
  );
};

export default ItemsDetail;
