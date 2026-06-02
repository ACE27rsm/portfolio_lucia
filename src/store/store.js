import { configureStore } from "@reduxjs/toolkit";

//* middlewares
import middleware from "./middlewares/rootMiddlewares";

//* saga
import { runSaga } from "./middlewares/saga/saga";

//* reducers
import reducer from "./reducers/reducer";

//* actions
import { SET_THEME } from "./actions/actions";

//=b Il tema MUI viene salvato in `ui.theme` e contiene funzioni
//=b (breakpoints.up, ecc.) non serializzabili: escludo quel ramo e l'azione
//=b SET_THEME dai check di RTK, lasciandoli attivi sul resto dello state.
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [SET_THEME.type],
        ignoredPaths: ["ui.theme"],
      },
      immutableCheck: {
        ignoredPaths: ["ui.theme"],
      },
    }).concat(middleware),
});

export default store;

// devo lanciare redux-saga dopo aver configurato il middleware nello store
runSaga();
