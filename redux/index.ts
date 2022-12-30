import { types } from "@babel/core";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import topUserArtistsReducer from "./slices/topUserArtists";
import albumsReducer from "./slices/Albums"
export const store = configureStore({
  reducer: {
    user: userReducer,
    topUserArtists: topUserArtistsReducer,
    albums: albumsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
