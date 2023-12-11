import { createSlice } from "@reduxjs/toolkit";

const PasswordReducer = createSlice({
  name: "password",
  initialState: {},
  reducers: {
    storeUser: (state, action) => {
      return action.payload;
    },
    clearUser: (state, action) => {
      return (state = {});
    },
  },
});

export const { storeUser, clearUser } = PasswordReducer.actions;
export default PasswordReducer.reducer;
