import { createSlice, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import { persistReducer, persistStore } from "redux-persist";

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

// Profile Slice
const profileSlice = createSlice({
  name: "profile",
  initialState: { isImageUploaded: false },
  reducers: {
    toggleImageUpload(state) {
      state.isImageUploaded = !state.isImageUploaded;
    },
  },
});

// Redux Persist Configuration
const userPersistConfig = {
  key: "user", // Key for localStorage
  storage, // Storage mechanism
};

const profilePersistConfig = {
  key: "profile", // Separate key for profile
  storage, // Storage mechanism
};

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);
const persistedProfileReducer = persistReducer(
  profilePersistConfig,
  profileSlice.reducer
);

// Redux Store
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    profile: persistedProfileReducer,
  },
});

// Persistor (for PersistGate)
export const persistor = persistStore(store);

// Export Actions
export const userActions = userSlice.actions;
export const profileActions = profileSlice.actions;

export default store;
