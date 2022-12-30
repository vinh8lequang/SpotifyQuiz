import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/storage";
import { apiEndpoints } from "../../services/api";
import axios, { AxiosRequestConfig } from "axios";
import { RootState } from "..";

interface TopUserArtists {
  isLoading: boolean;
  data: [];
  isError: boolean;
}

const initialState: TopUserArtists = {
  isLoading: false,
  data: [],
  isError: false,
};

const topUserArtists = createSlice({
  name: "topuserartists",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopUserArtists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTopUserArtists.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTopUserArtists.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const topUserArtistsSelector = (state: RootState) =>
  state.topUserArtists;
export default topUserArtists.reducer;

export const fetchTopUserArtists = createAsyncThunk(
  "/user/topuserartists",
  async () => {
    const token = await getData("@access_token");
    // console.log("Token", token);
    const url = apiEndpoints.getUserTopArtists();
    const config: AxiosRequestConfig = {
      url: url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        limit: 6,
        time_range: "medium_term",
      },
    };
    const response = await axios(config);
    // console.log("TopArtists:", response.data.items);
    // console.log("NameArtist:", response.data.items[0].name);
    // console.log("ImageUri:", response.data.items[0].images[0].url);
    // console.log("NameArtist:", response.data.items[1].name);
    // console.log("ImageUri:", response.data.items[1].images[0].url);

    // console.log("Debug------------------------------");
    // response.data.items.forEach((item: any) => {
    //   console.log("ArtistId:", item.id);
    //   console.log("ArtistName:", item.name);
    //   console.log("ImageUri:", item.images[0].url);
    // });
    var res =[]
    response.data.items.forEach((item: any) => {
      res.push({
        id: item.id,
        imageUri: item.images[0].url,
        artistName: item.name,
      })
    })
    return res;
  }
);
