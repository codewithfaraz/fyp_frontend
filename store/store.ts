import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { username: "" },
  reducers: {
    setUser(state, action) {
      state.username = action.payload;
    },
  },
});
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export default store;
export const userActions = userSlice.actions;
