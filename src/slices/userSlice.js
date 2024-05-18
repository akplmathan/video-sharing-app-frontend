import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
  },
});

export const verifyToken = (token) => {
  return async (dispatch) => {
    if (token) {
      const response = await axios.get('https://video-sharing-app-backend-1.onrender.com/user/find-user', {
        headers: {
          Authorization: token,
        },
      });

      dispatch(addUser(response.data));
    }
  };
};

export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer;
