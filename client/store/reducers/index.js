import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import reviewReducer from "./reviewReducer";

const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
  orderReducer,
  reviewReducer
});

export default rootReducer;
