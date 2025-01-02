import axios from "axios";
import { ADD_USER, DELETE_USER, GET_USER, GET_USER_BY_ID, UPDATE_USER } from "./types";
import { toast } from "react-toastify";

export const addUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/add`, payload);
      console.log("Response received:", response);

      // Dispatching the response to the store
      dispatch({ type: ADD_USER, payload: response?.data });

      // Check if the response status is true or false and show the appropriate toast message
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);  // Success message from backend
      } else {
        toast.error(response?.data?.message);  // Error message from backend
      }
    } catch (error) {
      // Log the error response and the error message if the request fails
      console.error("Error during API call:", error);

      if (error.response) {
        // Log the full error response if the request fails (status 400 or others)
        console.log("Error response data:", error.response.data);
        toast.error(error.response?.data?.message || "Internal Server Error");
      } else {
        // Handle network or other errors
        toast.error("Network Error");
      }
    }
  };
};


export const getUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAllUser`, payload);

      dispatch({ type: GET_USER, payload: response?.data });
    } catch (error) {
      console.error("Error fetching Get user Data", error?.message);
    }
  };
};
export const updateUser = (payload ,id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update/${id}`, payload);
      console.log("response",response)

      dispatch({ type: UPDATE_USER, payload: response?.data });
      if(response?.data?.status === true){
        toast.success(response?.data?.message);
      }else{
        toast.error(response?.data?.message);
      }
      
    } catch (error) {
      console.error("Error fetching update user Data", error?.message);
      if (error.response) {
        // Log the full error response if the request fails (status 400 or others)
        console.log("Error response data:", error.response.data);
        toast.error(error.response?.data?.message || "Internal Server Error");
      } else {
        // Handle network or other errors
        toast.error("Network Error");
      }

    }
  };
};
export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getById/${id}`);

      dispatch({ type: GET_USER_BY_ID, payload: response?.data });
    } catch (error) {
      console.error("Error fetching Get by userId ", error?.message);
    }
  };
};
export const deleteUser = (id,payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/user/deleteUser/${id}`);

      dispatch({ type: DELETE_USER, payload: response?.data });
      toast.success("User Deleted Successfully!")
      dispatch(getUser(payload));

    } catch (error) {
      console.error("Error fetching delete user ", error?.message);
      toast.error("Something went wrong");
    }
  };
};