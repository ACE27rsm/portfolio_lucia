import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { brown } from "@mui/material/colors";
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";

//* components
import PageTransition from "./layout/components/transition/PageTransition";
import Intro from "./layout/components/intro/Intro";

//* actions
import { SET_THEME } from "../store/actions/actions";

//* store
import store from "../store/store";

const theme = createTheme({
  //=? PALETTE
  palette: {
    primary: {
      light: "#a98274",
      main: "#795548",
      dark: "#4b2c20",
      contrastText: "#fff",
    },
    secondary: {
      light: "#cfff95",
      main: "#9ccc65",
      dark: "#6b9b37",
      contrastText: "#fff",
    },
    text: {
      primary: brown[400],
    },
  },
  //=? TYPOGRAPHY
  typography: {
    fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
    h1: {
      fontFamily: '"Barriecito" cursive',
    },
  },
});

//=STRT ================================
const App = () => {
  store.dispatch(SET_THEME({ ...theme }));

  //=y State

  //=? Cycle

  //=+ Handlers

  //=g Utils

  //=o Variables

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <BrowserRouter>
          <Intro>
            <Routes>
              <Route path="*" element={<PageTransition />} />
            </Routes>
          </Intro>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
