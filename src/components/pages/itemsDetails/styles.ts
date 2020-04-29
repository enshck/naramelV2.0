import styled from "styled-components";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
} from "utils/styles";

export const MainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const GridColumn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const ControlsContainer = styled.div`
  max-width: 180px;
  width: 100%;
  h2 {
    font-size: 24;
    font-weight: 400;
    :after {
      content: " грн.";
      display: inline;
      font-size: 16px;
    }
  }
`;

export const StyledSelectorInput = styled(GoodsStyledSelectorInput)``;

export const StyledSelectorOption = styled(GoodsStyledSelectorOption)``;

export const StyledSelectorOptions = styled(GoodsStyledSelectorOptions)``;
