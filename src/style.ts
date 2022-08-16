import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: "Oswald",sans-serif;
  background-color:#FAFAFA;
  color: #424242;
  ::-webkit-scrollbar {
    width: 9px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(149 117 205 / 26%);
    border-radius: 5px;
  }
  }
`;
