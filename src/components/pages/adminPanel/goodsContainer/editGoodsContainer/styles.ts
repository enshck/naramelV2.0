import styled, { css } from "styled-components";

import { PlusButton } from "./editFiltersPopover/styles";
import { StyledTextArea as TextArea } from "utils/styles";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
} from "utils/styles";

export const MainContainer = styled.form`
  flex: 1 0 auto;
  width: 100%;
  padding: 20px;
  overflow: auto;
`;

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 300px;
  outline: none;
`;

export const StyledTextArea = styled(TextArea)``;

export const InputContainer = styled.div``;

export const SelectorContainer = styled.div`
  max-width: 250px;
  width: 100%;
  z-index: 1;
  position: relative;
`;

export const StyledSelectorInput = styled(GoodsStyledSelectorInput)``;

export const StyledSelectorOption = styled(GoodsStyledSelectorOption)``;

export const StyledSelectorOptions = styled(GoodsStyledSelectorOptions)`
  overflow-y: initial;
`;

export const ChangedSubItemContainer = styled.div``;

export const ImageCard = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  border-left: none;
  padding: 5px;
  margin-right: 20px;
  border-left: 1px solid ${(props) => props.theme.inputsBorderColor};
  z-index: 100;
  background: #fff;
  :last-child {
    margin-right: 0;
  }
`;

export const DroppableContainer = styled.div`
  /* max-width: 600px; */
  display: flex;
  flex: 1 0 auto;
  overflow-y: auto;
  padding: 20px 0;
`;

export const DraggableImagesContainer = styled.div`
  /* display: flex; */
  /* width: 100%; */
  /* display: 'flex', */
  /* padding: 20px;
  overflow: auto; */
  display: inline-flex;
  position: relative;
  padding: 0 20px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const DragNDropContainer = styled.div`
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  margin: 10px 0;
`;

export const CoverPictureContainer = styled.div`
  border: 1px solid ${(props) => props.theme.mainButtonColor};
  position: absolute;
  width: 130px;
  height: 130px;
  left: 15px;
  top: -5px;
  content: "";
  z-index: 10;
`;

export const InputRow = styled.div`
  display: flex;
`;

export const MainFiltersContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;

  li {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 0 20px;
    position: relative;
    width: fit-content;
  }

  h2 {
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 10px 0;
    position: relative;
    width: fit-content;
  }
`;

export const FilterValuesContainer = styled.ul`
  list-style: none;
  padding: 0 0 0 20px;

  li {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
  }
`;

export const Button = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #dbdcde;
  border-radius: 100%;
  stroke: ${(props) => props.theme.mainButtonColor};
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  position: absolute;
  top: calc(50% - 15px);
  right: 0;
  ${({ right }: { right?: string }) =>
    css`
      right: ${right};
    `}
`;

export const PlusButtonContainer = styled(Button)`
  stroke: #792c9b;
  max-width: 25px;
  max-height: 25px;
  padding: 5px;
  border: 1px solid #dbdcde;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: -30px;
  top: 1px;
`;
