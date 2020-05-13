import React, { useState } from "react";
import styled from "styled-components";

import { IProfile } from "utils/interfaces";
import Header from "./header";
import Caregories from "./categoryContainer";

const MainContainer = styled.div``;

interface IProps {
  profile: IProfile;
}

const AdminPanel = (props: IProps) => {
  const [changedTab, setChangedTab] = useState(1);

  return (
    <MainContainer>
      <Header changedTab={changedTab} setChangedTab={setChangedTab} />
      {changedTab === 1 && <Caregories />}
    </MainContainer>
  );
};

export default AdminPanel;
