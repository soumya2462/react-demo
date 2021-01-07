import thunk from "redux-thunk";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import componentExampleReducer from "./../ducks/componentExample";
import authReducer from "./../ducks/Auth";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  componentExample: componentExampleReducer,
  auth: authReducer,
  //other: otherReducer,
});

const storeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWare = [];
middleWare.push(thunk);

let store = createStore(
  persistReducer(persistConfig, rootReducer),
  {},
  storeEnhancers(applyMiddleware(...middleWare))
);
let persistor = persistStore(store)

export { store, persistor }
