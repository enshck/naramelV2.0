import styled from "styled-components";
import { Dialog } from "@material-ui/core";

import {
  StyledInput as Input,
  SelectorInput,
  StyledSearchList as SearchList,
  StyledOption as Option,
} from "../customerDataForm/styles";
import { BuyButton } from "utils/styles";

export const MainContainer = styled(Dialog)``;

export const ContentContainer = styled.div`
  padding: 20px;
`;

export const FilterMainContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  width: 400px;
`;

export const StyledLabel = styled.label`
  font-size: 16px;
`;
export const ItemsListContainer = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.spreadColor};
  overflow: auto;
  max-height: 400px;
  margin-top: 15px;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  padding: 5px;
`;

export const ItemsListElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.3s;
  padding: 5px;

  :hover {
    border-color: ${(props) => props.theme.mainButtonColor};
  }
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemsListElementText = styled.div`
  margin-left: 10px;
  h3 {
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.8;
  }
`;

export const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: none;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const EmptyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  margin-top: 20px;
`;

export const SelectorContainer = styled.div`
  width: 150px;
`;

export const StyledSelectorInput = styled(SelectorInput)``;

export const StyledSearchList = styled(SearchList)`
  width: 150px;
  position: absolute;
`;

export const StyledOption = styled(Option)``;

export const SubmitButton = styled(BuyButton)`
  padding: 7px;
  margin: 0 0 0 15px;
`;
