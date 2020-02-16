import React, { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import { setMenuItems } from "../../store/actions";
import { MainContainer } from "./styles";
import Spinner from "../spinner";
import firebase from "../../utils/firebase";

interface IProps {
  children: any;
}

const WrapComponent = (props: IProps) => {
  const [isFetching, setFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);

    firebase
      .firestore()
      .collection("category")
      .get()
      .then(doc => {
        const docData: any = doc.docs.map(elem => elem.data());
        dispatch(setMenuItems(docData));
        setFetching(false);
      });
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  return <MainContainer>{props.children}</MainContainer>;
};

export default WrapComponent;
