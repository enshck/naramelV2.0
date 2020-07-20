import styled from "styled-components";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
} from "utils/styles";

export const MainContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export const StyledSelectorOption = styled(GoodsStyledSelectorOption)`
  align-items: flex-start;
  padding: 5px;
  cursor: pointer;
`;

export const StyledSelectorOptions = styled(GoodsStyledSelectorOptions)``;

export const DescriptionMainContainer = styled.div`
  margin: 70px 0 0 48px;
  padding-bottom: 10px;
  box-sizing: border-box;
  max-width: 100%;
  h1 {
    font-size: 24px;
    color: #333;
    text-align: center;
    position: relative;
    font-weight: 400;
    margin: 20px 0 8px 0;
  }
  p {
    font-size: 14px;
    margin: 0;
    margin-top: 10px;
  }
`;

export const DescriptionGridContainer = styled.div`
  display: block;
  column-count: 3;
  column-gap: 20px;
  margin-top: 20px;
  word-break: break-all;
`;
