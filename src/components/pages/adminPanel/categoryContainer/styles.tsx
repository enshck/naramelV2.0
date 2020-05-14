import React from "react";
import styled from "styled-components";
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
  justify-content: center;
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
    margin: "0 !important",
    minHeight: "0 !important",
  },
})((props: any) => <ExpansionPanelSummary {...props} />);

export const StyledExpansionPanelDetails = withStyles({
  root: {
    padding: 0,
    margin: "0",
    position: "relative",
    borderBottom: "1px solid #DBDCDE",
  },
})((props: any) => <ExpansionPanelDetails {...props} />);

export const SubCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryName = styled.p`
  font-size: 14px;
  span {
    opacity: 0.6;
  }
`;

export const SubCategoryElement = styled.div`
  margin: 15px 0;
`;
