import { types } from "@babel/core";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./slices/user";
import topUserArtistsReducer from "./slices/topUserArtists";
import albumsReducer from "./slices/Albums";
import tracksReducer from "./slices/tracks";
import topTracksReducer from "./slices/topTracks";
import relatedArtistReducer from "./slices/relatedArtist";

export const store = configureStore({
  reducer: {
    user: userReducer,
    topUserArtists: topUserArtistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    topTracks: topTracksReducer,
    relatedArtist:relatedArtistReducer
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
