import React, { useState } from "react";
import styled from "styled-components";

import firebase from "utils/firebase";
import { errors } from "utils/errors";
import Form from "./form";

const MainContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: #f6f8fb;
`;

interface IProps {
  history: {
    push: (path: string) => void;
  };
}

const SignUp = (props: IProps) => {
  const { history } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const authHandler = () => {
    const { email, password } = formData;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        user && history.push("/adminPanel");
      })
      .catch((err) => {
        const error = errors[err.code];

        if (error) {
          setFormData({
            ...formData,
            error,
          });
        }
      });
  };

  return (
    <MainContainer>
      <Form
        formData={formData}
        setFormData={setFormData}
        signUpHandler={authHandler}
      />
    </MainContainer>
  );
};

export default SignUp;
