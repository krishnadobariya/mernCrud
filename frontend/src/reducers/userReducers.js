import { ADD_USER, DELETE_USER, GET_USER, GET_USER_BY_ID, UPDATE_USER } from "../actions/types";

const initialState = {
    users: {},
    getUser:{},
    upadteUser:{},
    getUserById:{},
    delete:{},
    loading: false,
}

const usersReducer = (state = initialState, action) => {
    switch (action?.type) {
      case ADD_USER:
        return { ...state, loading: true , users: action?.payload};
      case GET_USER:
        return { ...state, loading: true, getUser:action?.payload };
      case UPDATE_USER:
        return { ...state, loading: true, upadteUser:action?.payload };
      case GET_USER_BY_ID:
        return { ...state, loading: true, getUserById:action?.payload };
      case DELETE_USER:
        return { ...state, loading: true, delete:action?.payload };
      default:
        return state;
    }
  };
  export default usersReducer;
  