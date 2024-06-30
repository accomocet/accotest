import axios from "axios";
import {
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
} from "../constants/houseConstants";

export const listHouses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/houses", config);

    dispatch({
      type: HOUSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: HOUSE_LIST_FAIL,
      payload: message,
    });
  }
};