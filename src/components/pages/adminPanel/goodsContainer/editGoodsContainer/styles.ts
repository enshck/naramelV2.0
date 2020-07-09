import styled, { css } from "styled-components";

import { StyledTextArea as TextArea, BuyButton } from "utils/styles";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
} from "utils/styles";

export const MainContainer = styled.form`
  flex: 1 0 auto;
  width: 100%;
  padding: 20px;
`;

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 300px;
  outline: none;
  margin-top: 10px;
`;

export const StyledTextArea = styled(TextArea)`
  margin-top: 10px;
`;

export const InputContainer = styled.div`
  margin-top: 20px;
`;

export const SelectorContainer = styled.div`
  max-width: 250px;
  width: 100%;
  z-index: 999;
  position: relative;
  margin-top: 10px;
`;

export const StyledSelectorInput = styled(GoodsStyledSelectorInput)``;

export const StyledSelectorOption = styled(GoodsStyledSelectorOption)``;

export const StyledSelectorOptions = styled(GoodsStyledSelectorOptions)`
  overflow-y: initial;
`;

export const ChangedSubItemContainer = styled.div`
  h2 {
    font-weight: 500;
    font-size: 20px;
    margin: 0;
  }
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
`;

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
  position: relative;
  :last-child {
    margin-right: 0;
  }
`;

export const DroppableContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  overflow-y: auto;
  padding: 20px 0;
`;

export const DraggableImagesContainer = styled.div`
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
  margin: 20px 0 0 0;
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
  flex-direction: column;
  max-width: 250px;
  margin-top: 20px;
`;

export const MainFiltersContainer = styled.ul`
  list-style: none;
  margin: 20px 0;
  padding: 0;
  position: relative;

  h2 {
    font-size: 20px;
    font-weight: 400;
    color: #000;
    margin: 0 0 10px 0;
    position: relative;
    width: fit-content;
  }

  li {
    font-size: 18px;
    font-weight: 400;
    margin: 0 0 0 20px;
    position: relative;
    width: fit-content;
  }
`;

export const FilterValuesContainer = styled.ul`
  list-style: none;
  padding: 0 0 0 20px;

  li {
    font-size: 15px;
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

  svg {
    width: 12px;
    height: 12px;
  }
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

export const ItemFileInputContainer = styled.div`
  background: ${(props) => props.theme.mainButtonColor};
  color: #fff;
  max-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  margin: 20px 0 0 0;

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  label {
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 8px;
  }
`;

export const SubmitButton = styled(BuyButton)`
  max-width: 200px;
  width: 100%;
`;

export const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const DeleteButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  stroke: red;
  padding: 5px;
  border: 1px solid red;
  border-radius: 100%;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const SpinnerMainContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 100px 0 0 0;
    font-weight: 500;
    font-size: 20px;
  }
`;

export const InputLabel = styled.label`
  font-size: 18px;
  color: #000;
`;
