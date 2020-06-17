import React, { BaseSyntheticEvent, Fragment } from "react";

import {
  StyledInput,
  StyledTextArea,
  InputContainer,
  SelectorContainer,
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
} from "./styles";
import { IGoodsElement } from "components/pages/items";
import Input from "components/inputs";
import Selector from "components/inputs/selector";
import { IOption } from "../";
import arrowDown from "assets/goods/arrowDown.png";

interface IProps {
  itemDataClone: IGoodsElement;
  listOfGoodsCategory: IOption[];
  onInputHandler: (e: BaseSyntheticEvent) => void;
  onChangeGroup: (newValue: IOption) => void;
}

const EditGoodsContainer = ({
  itemDataClone,
  listOfGoodsCategory,
  onInputHandler,
  onChangeGroup,
}: IProps) => {
  const { name, subName, brand, description, groupId } = itemDataClone;

  return (
    <Fragment>
      <InputContainer>
        <Input
          StyledComponent={StyledInput}
          name={"name"}
          type={"text"}
          value={name}
          onInput={onInputHandler}
        />
      </InputContainer>
      <InputContainer>
        <Input
          StyledComponent={StyledInput}
          name={"subName"}
          type={"text"}
          value={subName}
          onInput={onInputHandler}
        />
      </InputContainer>
      <InputContainer>
        <Input
          StyledComponent={StyledInput}
          name={"brand"}
          type={"text"}
          value={brand}
          onInput={onInputHandler}
        />
      </InputContainer>
      <InputContainer>
        <Input
          StyledComponent={StyledTextArea}
          name={"description"}
          type={"text"}
          value={description}
          onInput={onInputHandler}
        />
      </InputContainer>
      <SelectorContainer>
        <Selector
          StyledInputContainer={StyledSelectorInput}
          StyledOptionContainer={StyledSelectorOptions}
          StyledOption={StyledSelectorOption}
          options={listOfGoodsCategory}
          changedValue={{
            label:
              listOfGoodsCategory.find((elem) => elem.value === groupId)
                ?.label || "",
            value: groupId,
          }}
          setNewValue={onChangeGroup}
          arrowIcon={arrowDown}
        />
      </SelectorContainer>
    </Fragment>
  );
};

export default EditGoodsContainer;
