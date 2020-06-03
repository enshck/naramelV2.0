import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

import { MainContainer, GridElement } from "./styles";

const GoodsContainer = () => {
  const history = useHistory();
  const { search } = history.location;
  const changedIdOfItem = useMemo(() => {
    const { id } = qs.parse(search.slice(1));

    return id;
  }, [search]);

  return (
    <MainContainer>
      <GridElement></GridElement>
      <GridElement></GridElement>
    </MainContainer>
  );
};

export default GoodsContainer;
