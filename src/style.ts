import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: "Oswald",sans-serif;
  background-color:#FAFAFA;
  overflow-x: hidden;
  color: #424242;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color:#7986cb78;
    border-radius: 5px;
  }
  }

`;
