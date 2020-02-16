import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    font-family: "Proxima Nova Regular", "Proxima Nova Thin", "Roboto",
      "SF UI Display Regular", sans-serif;
    letter-spacing: 0.2px;
    box-sizing: border-box;
}
body {
    font-family: "Proxima Nova Regular", "Proxima Nova Thin",
      "SF UI Display Regular", sans-serif;
    background-color: #eaeef2;
    margin: 0px;
    padding: 0px;
}
`;
