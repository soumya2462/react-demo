import { createStore, applyMiddleware ,compose} from 'redux';
import root_reducer from '../../redux/reducers/root_reducer';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
};



const storeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleWare = [];
middleWare.push(thunk);

export const store = createStore(
  persistReducer(persistConfig, root_reducer),
  undefined,
  storeEnhancers(applyMiddleware(...middleWare))
);

export const persistor = persistStore(store);
