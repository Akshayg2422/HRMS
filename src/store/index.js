import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'zeny-q',
  storage,
  blacklist: ['AppReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

let persistor = persistStore(store);



export { store, persistor, sagaMiddleware }

