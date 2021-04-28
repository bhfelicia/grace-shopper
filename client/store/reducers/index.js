import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({ categoryReducer, productReducer });

export default rootReducer;
