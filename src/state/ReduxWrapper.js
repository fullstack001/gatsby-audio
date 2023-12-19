import React from "react";
import { Provider } from "react-redux";
import { createStore as reduxCreateStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import rootReducer from ".";
import { composeWithDevTools } from "redux-devtools-extension";

const createStore = () =>
  reduxCreateStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(ReduxPromise)
      // other store enhancers if any
    )
  );

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);
