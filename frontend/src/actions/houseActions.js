import axios from "axios";
import {
  HOUSE_CREATE_SUCCESS,
  HOUSE_CREATE_REQUEST,
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
  HOUSE_CREATE_FAIL,
  HOUSE_UPDATE_REQUEST,
  HOUSE_UPDATE_SUCCESS,
  HOUSE_UPDATE_FAIL,
  HOUSE_DELETE_REQUEST,
  HOUSE_DELETE_SUCCESS,
  HOUSE_DELETE_FAIL,
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

export const createHouseAction =
  (
    houseName,
    houseRent,
    houseVacancies,
    houseLocation,
    houseContact,
    housePic
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: HOUSE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/houses/create",
        {
          houseName,
          houseRent,
          houseVacancies,
          houseLocation,
          houseContact,
          housePic,
        },
        config
      );

      dispatch({
        type: HOUSE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: HOUSE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateHouseAction =
  (
    id,
    houseName,
    houseRent,
    houseVacancies,
    houseLocation,
    houseContact,
    housePic
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: HOUSE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/houses/${id}`,
        {
          houseName,
          houseRent,
          houseVacancies,
          houseLocation,
          houseContact,
          housePic,
        },
        config
      );

      dispatch({
        type: HOUSE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: HOUSE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteHouseAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/houses/${id}`, config);

    dispatch({
      type: HOUSE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: HOUSE_DELETE_FAIL,
      payload: message,
    });
  }
};
