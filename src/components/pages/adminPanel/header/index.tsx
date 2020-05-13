import React from "react";

import { StyledTab, StyledTabs } from "./styles";

interface IProps {
  changedTab: number;
  setChangedTab: (tab: number) => void;
}

const Header = ({ changedTab, setChangedTab }: IProps) => {
  return (
    <StyledTabs
      value={changedTab}
      onChange={(e, value) => setChangedTab(value)}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      <StyledTab label="Заказы" />
      <StyledTab label="Категории" />
      <StyledTab label="Фильтры" />
      <StyledTab label="Товары" />
    </StyledTabs>
  );
};

export default Header;
