import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/storage";
import axios, { AxiosRequestConfig } from "axios";
import { RootState } from "..";
import { apiEndpoints } from "../../services/api";
import getInt from "../../services/getRandomInt";
import { shuffle } from "../../services/getRandomInt";

const NUMALBUMS = 6;
const NUMTRACKS = 15;
const NUMTRACKS2 = 10;
interface tracks {
  isLoading: boolean;
  data: [];
  isError: boolean;
}

//DECLARE INITIAL STATE OF THE DATA

const initialState: tracks = {
  isLoading: false,
  data: [
    {
      artistImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      artist: "Pepe",
      id: "",
      albumImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      albumName: "",
      trackName: "",
    },
    {
      artistImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      artist: "",
      id: "",
      albumImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      albumName: "",
      trackName: "",
    },
    {
      artistImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      artist: "",
      id: "",
      albumImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      albumName: "",
      trackName: "",
    },
    {
      artistImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      artist: "",
      id: "",
      albumImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      albumName: "",
      trackName: "",
    },
    {
      artistImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      artist: "",
      id: "",
      albumImage:
        "https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg",
      albumName: "",
      trackName: "",
    },
  ],
  isError: false,
};

//CREATE THE SLICE AND SET THE REDUCERS

const tracks = createSlice({
  name: "tracks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const tracksSelector = (state: RootState) => state.tracks;

export default tracks.reducer;

//FETCH TRACKS DATA
export const fetchTracks = createAsyncThunk("/user/tracks", async () => {
  var albums = await getData("@albums");
  albums = JSON.parse(albums);

  var res = [];
  const token = await getData("@access_token");
  var i = getInt(0, NUMALBUMS);
  const url = "https://api.spotify.com/v1/albums/" + albums[i].id + "/tracks";
  const config: AxiosRequestConfig = {
    url: url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      limit: NUMTRACKS,
      time_range: "medium_term",
    },
  };

  const response = await axios(config);
  var p = [];

  for (var j = 0; j < response.data.items.length; j++) {
    p.push(j);
  }
  p = shuffle(p);

  for (var j = 0; j < 4; j++) {
    res.push({
      artistImage: albums[i].artistsImage,
      artist: albums[i].artists,
      id: response.data.items[p[j]].id,
      albumImage: albums[i].imageUri,
      albumName: albums[i].albumName,
      trackName: response.data.items[p[j]].name,
    });
  }

  const url2 = "https://api.spotify.com/v1/albums/" + albums[4].id + "/tracks";
  const config2: AxiosRequestConfig = {
    url: url2,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      limit: NUMTRACKS2,
      time_range: "medium_term",
    },
  };

  const response2 = await axios(config2);

  var p = [];
  for (var i = 0; i < response2.data.items.length; i++) {
    p.push(i);
  }
  p = shuffle(p);

  res.push({
    artistImage: albums[4].artistsImage,
    artist: albums[4].artists,
    id: response.data.items[p[0]].id,
    albumImage: albums[4].imageUri,
    albumName: albums[4].albumName,
    trackName: response2.data.items[p[0]].name,
  });

  return res;
});
