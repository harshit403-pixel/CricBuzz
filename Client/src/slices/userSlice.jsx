import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  picture: "",
  role: "",

  isAuthenticated: false,
  authLoading: true,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.id = user.id || user._id;
      state.name = user.name || "";
      state.email = user.email || "";
      state.picture = user.picture || "";
      state.role = user.role || "";

      state.isAuthenticated = true;
      state.authLoading = false;
    },

    finishAuthLoading: (state) => {
      state.authLoading = false;
    },

    logout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.picture = "";
      state.role = "";

      state.isAuthenticated = false;
      state.authLoading = false;
    },
  },
});

export const {
  setUser,
  finishAuthLoading,
  logout,
} = userSlice.actions;

export default userSlice.reducer;