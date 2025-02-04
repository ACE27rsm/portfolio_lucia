import createSagaMiddleware from "redux-saga";

// sagas
import rootSaga from "./rootSaga";

export const sagaMiddleware = createSagaMiddleware();

export const runSaga = () => sagaMiddleware.run(rootSaga);
