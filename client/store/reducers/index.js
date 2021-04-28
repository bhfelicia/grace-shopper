import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
  orderReducer,
});

export default rootReducer;
