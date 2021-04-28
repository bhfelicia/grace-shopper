import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import reviewReducer from "./reviewReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
  orderReducer,
  reviewReducer,
  userReducer
});

export default rootReducer;
