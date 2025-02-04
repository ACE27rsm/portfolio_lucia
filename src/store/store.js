import { configureStore } from "@reduxjs/toolkit";

//* middlewares
import middleware from "./middlewares/rootMiddlewares";

//* saga
import { runSaga } from "./middlewares/saga/saga";

//* reducers
import reducer from "./reducers/reducer";

const store = configureStore({ reducer, middleware });

export default store;

// devo lanciare redux-saga dopo aver configurato il middleware nello store
runSaga();
