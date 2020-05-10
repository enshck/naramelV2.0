import styled from "styled-components";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
} from "utils/styles";

export const MainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin-top: 50px;
`;

export const GridColumn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  min-width: 0;
`;

export const SliderContainer = styled.div`
  width: 100%;
  padding: 0 20px 20px 20px;
`;

export const StyledSelectorInput = styled(GoodsStyledSelectorInput)`
  justify-content: flex-start;
`;

export const StyledSelectorOption = styled(GoodsStyledSelectorOption)``;

export const StyledSelectorOptions = styled(GoodsStyledSelectorOptions)``;
