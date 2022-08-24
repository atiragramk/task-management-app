import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./style";
import App from "./App";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  typography: {
    fontFamily: `"Oswald", sans-serif`,
    fontSize: 14,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 500,
  },
  palette: {
    primary: {
      main: "#9575CD",
      light: "#7986CB",
    },
    secondary: {
      main: "#e8eaf6",
      light: "#9FA8DA",
      dark: "#546E7A",
    },
    info: {
      main: "#5C6BC0",
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
