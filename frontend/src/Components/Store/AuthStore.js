import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  login: false,
  token: "",
  followers: 0,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.login = !state.login;
      console.log(state.login);
    },
    logout(state) {
      state.login = !state.login;
      console.log(state.login);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    userLogOut(state){
     state.login=false
     state.followers=0
     state.token=''
      
    },
    setFollowers(state, action) {
      state.followers = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
