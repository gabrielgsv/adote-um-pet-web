import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk";
import reducers from "./reducers";

const initialState = {}

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export type AppState = ReturnType<typeof reducers>

const store: Store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store)

export {store, persistor};