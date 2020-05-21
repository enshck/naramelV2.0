import React from "react";
import styled, { css } from "styled-components";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Drawer,
  withStyles,
} from "@material-ui/core";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

export const CategoriesContainer = styled.div`
  width: 60%;
`;

export const StyledExpansionPanel = withStyles({
  root: {
    boxShadow: "none",
    padding: 0,
  },
  expanded: {
    margin: "0 !important",
  },
})((props: any) => <ExpansionPanel {...props} />);

export const StyledExpansionPanelSummary = withStyles({
  root: {
    padding: 0,
    borderBottom: "1px solid #DBDCDE",
  },
  content: {
    margin: 0,
  },
  expanded: {
    margin: "10px 0 !important",
    minHeight: "0 !important",
  },
})((props: any) => <ExpansionPanelSummary {...props} />);

export const StyledExpansionPanelDetails = withStyles({
  root: {
    padding: 0,
    margin: "0",
    position: "relative",
    // borderBottom: "1px solid #DBDCDE",
  },
})((props: any) => <ExpansionPanelDetails {...props} />);

export const SubCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CategoryName = styled.div`
  font-size: 14px;
  position: relative;
  span {
    opacity: 0.6;
  }
`;

export const SubCategoryElement = styled.div`
  margin: 10px 0;
  border: 1px solid #dbdcde;
  padding: 15px;
  width: 100%;
  position: relative;
  span {
    opacity: 0.6;
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

export const AddCategoryButton = styled.div`
  display: flex;
`;

export const PlusCategoryIconContainer = styled.div`
  stroke: #792c9b;
  max-width: 30px;
  max-height: 30px;
  padding: 5px;
  border: 1px solid #dbdcde;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
`;
