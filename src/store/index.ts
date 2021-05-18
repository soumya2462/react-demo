import { createStore, compose, combineReducers, applyMiddleware, Reducer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authReducer, AuthState } from './../ducks/Auth';
import componentExampleReducer from './../ducks/componentExample';

const persistConfig = {
  key: 'root',
  storage,
};

export type RootState = {
  componentExample: any,
  auth: AuthState,
};

export const rootReducer: Reducer<RootState> = combineReducers({
  componentExample: componentExampleReducer,
  auth: authReducer,
  //other: otherReducer,
});

const storeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWare = [];
middleWare.push(thunk);

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  undefined,
  storeEnhancers(applyMiddleware(...middleWare))
);

export const persistor = persistStore(store);
