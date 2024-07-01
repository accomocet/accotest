import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Importing thunk correctly
import { composeWithDevTools } from "redux-devtools-extension"; // Correct package name
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  houseCreateReducer,
  houseDeleteReducer,
  houseListReducer,
  houseUpdateReducer,
} from "./reducers/houseReducers";

const reducer = combineReducers({
  //this will contain our reducers

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  houseList: houseListReducer,
  houseCreate: houseCreateReducer,
  houseUpdate: houseUpdateReducer,
  houseDelete: houseDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
