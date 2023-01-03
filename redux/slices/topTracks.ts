import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/storage";
import { apiEndpoints } from "../../services/api";
import axios, { AxiosRequestConfig } from "axios";
import { RootState } from "..";
import { storeData } from "../../utils/storage";

interface topTracks {
  isLoading: boolean;
  data: [];
  isError: boolean;
}

const initialState: topTracks = {
  isLoading: false,
  data: [],
  isError: false,
};

const topTracks = createSlice({
  name: "topuserartists",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopTracks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTopTracks.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTopTracks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const topTracksSelector = (state: RootState) => state.topTracks;
export default topTracks.reducer;

export const fetchTopTracks = createAsyncThunk("/user/topTracks", async () => {
  const token = await getData("@access_token");
  // console.log("Token", token);
  const url = apiEndpoints.getTracks();
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

  var res = [];
  response.data.items.forEach((item: any) => {
    res.push({
      id: item.id,
      imageUri: item.album.images[0].url,
      artistName: item.name,
    });
  });

  console.log(res);
  storeData("@topTracks", JSON.stringify(res));
  return res;
});
