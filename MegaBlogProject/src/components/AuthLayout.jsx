import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  loaded: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload.userData
      state.loaded = true
    },
    logout: (state) => {
      state.status = false
      state.userData = null
      state.loaded = true
    },
    authChecked: (state) => {
      state.loaded = true
    }
  }
})

export const { login, logout, authChecked } = authSlice.actions
export default authSlice.reducer
