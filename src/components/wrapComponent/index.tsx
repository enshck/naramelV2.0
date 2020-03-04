import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setMenuItems, setFilters } from "store/actions";
import { MainContainer, Container } from "./styles";
import Spinner from "../spinner";
import firebase from "utils/firebase";

interface IProps {
  children: any;
}

const WrapComponent = (props: IProps) => {
  const [isFetching, setFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function effectHandler() {
      const categoryDocs = await firebase
        .firestore()
        .collection("category")
        .get();

      const filtersDocs = await firebase
        .firestore()
        .collection("filters")
        .get();

      const categoryDocData: any = categoryDocs.docs.map(elem => elem.data());
      const filtersDocData: any = filtersDocs.docs.map(elem => elem.data());

      dispatch(setMenuItems(categoryDocData));
      dispatch(setFilters(filtersDocData));
      setFetching(false);
    }

    setFetching(true);
    effectHandler();
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <MainContainer>
      <Container>{props.children}</Container>
    </MainContainer>
  );
};

export default WrapComponent;
