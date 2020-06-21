import React from "react";
import styled from "styled-components";
import { Popover, withStyles } from "@material-ui/core";

import { Button } from "../styles";
import { BuyButton } from "utils/styles";

import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
} from "utils/styles";

export const StyledPopover = withStyles({})((props: any) => (
  <Popover {...props} />
));

export const MainPopoverContainer = styled.form`
  width: 350px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: relative;
  height: 250px;
  overflow: auto;

  h1 {
    font-weight: 400;
    font-size: 18px;
  }
`;

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
`;

export const StyledSelectorInput = styled(GoodsStyledSelectorInput)``;

export const StyledSelectorOption = styled(GoodsStyledSelectorOption)``;

export const StyledSelectorOptions = styled(GoodsStyledSelectorOptions)`
  overflow-y: initial;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const PlusButton = styled(Button)`
  stroke: #792c9b;
  max-width: 30px;
  max-height: 30px;
  padding: 5px;
  border: 1px solid #dbdcde;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

export const SubmitButton = styled(BuyButton)``;
