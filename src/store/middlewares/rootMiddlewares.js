import logger from "./logger/logger";
import { sagaMiddleware } from "./saga/saga";

export default [sagaMiddleware, logger];
