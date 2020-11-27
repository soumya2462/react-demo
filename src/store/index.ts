import thunk from "redux-thunk";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import componentExampleReducer from "./../ducks/componentExample";

const rootReducer = combineReducers({
  componentExample: componentExampleReducer,
  //other: otherReducer,
});

const storeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWare = [];
middleWare.push(thunk);

const store = createStore(
  rootReducer,
  {},
  storeEnhancers(applyMiddleware(...middleWare))
);

export default store;
