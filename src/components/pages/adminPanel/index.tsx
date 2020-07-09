import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { IProfile } from "utils/interfaces";
import Header from "./header";
import Caregories from "./categoryContainer";
import Filters from "./filtersContainer";
import Goods from "./goodsContainer";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  max-height: calc(100vh - 135px);
`;

const TabsContainer = styled.div`
  max-height: 100%;
  display: flex;
`;

interface IProps {
  profile: IProfile;
}

const AdminPanel = (props: IProps) => {
  const [changedTab, setChangedTab] = useState(1);
  const { hash } = window.location;
  const history = useHistory();

  useEffect(() => {
    if (hash.length > 0) {
      setChangedTab(+hash.slice(1));
    }
  }, [hash]);

  const changeTabHandler = (newTab: number) => {
    history.push(`/adminPanel#${newTab}`);
  };

  return (
    <MainContainer>
      <Header changedTab={changedTab} setChangedTab={changeTabHandler} />
      <TabsContainer>
        {changedTab === 1 && <Caregories />}
        {changedTab === 2 && <Filters />}
        {changedTab === 3 && <Goods />}
      </TabsContainer>
    </MainContainer>
  );
};

export default AdminPanel;
