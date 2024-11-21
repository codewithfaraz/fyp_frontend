import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
const profileSlice = createSlice({
  name: "profile",
  initialState: { isImageUploaded: false },
  reducers: {
    toggleImageUpload(state) {
      state.isImageUploaded = !state.isImageUploaded;
    },
  },
});
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
  },
});
export default store;
export const userActions = userSlice.actions;
export const profileActions = profileSlice.actions;
