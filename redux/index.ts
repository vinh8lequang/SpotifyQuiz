import { types } from "@babel/core";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import topUserArtistsReducer from "./slices/topUserArtists";

export const store = configureStore({
  reducer: {
    user: userReducer,
    topUserArtists: topUserArtistsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
