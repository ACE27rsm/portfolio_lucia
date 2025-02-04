import { createLogger } from "redux-logger";

const logger = createLogger({
  predicate: (getState, action) => true,
});

export default logger;
