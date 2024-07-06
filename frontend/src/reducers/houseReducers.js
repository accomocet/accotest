import {
  HOUSE_CREATE_FAIL,
  HOUSE_CREATE_REQUEST,
  HOUSE_CREATE_SUCCESS,
  HOUSE_DELETE_FAIL,
  HOUSE_DELETE_REQUEST,
  HOUSE_DELETE_SUCCESS,
  HOUSE_LIST_ALL_FAIL,
  HOUSE_LIST_ALL_REQUEST,
  HOUSE_LIST_ALL_SUCCESS,
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
  HOUSE_UPDATE_FAIL,
  HOUSE_UPDATE_REQUEST,
  HOUSE_UPDATE_SUCCESS,
} from "../constants/houseConstants";

export const houseListReducer = (state = { houses: [] }, action) => {
  switch (action.type) {
    case HOUSE_LIST_REQUEST:
      return { loading: true };
    case HOUSE_LIST_SUCCESS:
      return { loading: false, houses: action.payload };
    case HOUSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const houseAllListReducer = (state = { houses: [] }, action) => {
  switch (action.type) {
    case HOUSE_LIST_ALL_REQUEST:
      return { loading: true };
    case HOUSE_LIST_ALL_SUCCESS:
      return { loading: false, houses: action.payload };
    case HOUSE_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const houseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_CREATE_REQUEST:
      return { loading: true };
    case HOUSE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case HOUSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const houseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_UPDATE_REQUEST:
      return { loading: true };
    case HOUSE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case HOUSE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const houseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_DELETE_REQUEST:
      return { loading: true };
    case HOUSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case HOUSE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
