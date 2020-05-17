import React from "react";
import styled from "styled-components";
import { Popover, withStyles } from "@material-ui/core";

import { BuyButton } from "utils/styles";

export const StyledPopover = withStyles({})((props: any) => (
  <Popover {...props} />
));

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
`;

export const MainPopoverContainer = styled.div`
  width: 350px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: 400;
    font-size: 18px;
  }
`;

export const SubmitButton = styled(BuyButton)`
  padding: 10px;
  margin: 20px 0 0 0;
  max-width: 200px;
`;
