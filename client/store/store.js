import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware, { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

//store: redux creates a store using the reducer defined above. it can accept changes using dispatch

export default store;
