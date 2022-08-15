import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./style";
import App from "./App";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";

const theme = createTheme({
  typography: {
    fontFamily: `"Oswald", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#9575CD",
      light: "#7986CB",
    },
    secondary: {
      main: "#e8eaf6",
      light: "#9FA8DA",
    },
    priority: {
      low: "#AED581",
      normal: "#B0BEC5",
      high: "#FFB74D",
      critical: "#FF7043",
    },
  },
} as ThemeOptions);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </>
);
