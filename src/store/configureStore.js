import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import api from "../middleware/api";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";

const logger = createLogger({
  //collapsed: (getState, action, logEntry) => !logEntry.error
});

const configureStore = preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, api, logger));

export default configureStore;
