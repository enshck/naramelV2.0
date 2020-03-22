import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import store from "../store";
import Routes from "./Routes";

const theme = {
  mainButtonColor: "#792c9b",
  secondaryButtonColor: "#d8d8d8",
  mainTextColor: "#333",
  secondaryTextColor: "#666",
  whiteTextColor: "#fff",
  spreadColor: "#ebebeb",
  inputsBorderColor: "#ccc"
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
