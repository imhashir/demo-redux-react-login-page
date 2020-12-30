import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";

// @ts-ignore
export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware)
  );
  // @ts-ignore
  store.dispatch(verifyAuth());
  return store;
}
