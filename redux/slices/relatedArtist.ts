import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/storage";
import axios, { AxiosRequestConfig } from "axios";
import { RootState } from "..";
import { storeData } from "../../utils/storage";
import getInt from "../../services/getRandomInt";

const NUMARTIST = 20;

interface relatedArtist {
  isLoading: boolean;
  data: [];
  isError: boolean;
}

const initialState: relatedArtist = {
  isLoading: false,
  data: [],
  isError: false,
};

const relatedArtist = createSlice({
  name: "relatedArtist",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedArtist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRelatedArtist.fulfilled, (state, { payload }) => {
      //@ts-ignore
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchRelatedArtist.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const relatedArtistSelector = (state: RootState) =>state.relatedArtist;
export default relatedArtist.reducer;

export const fetchRelatedArtist = createAsyncThunk(
  "/user/relatedArtist",
  async () => {
    const token = await getData("@access_token");
    var artists = await getData("@topArtis");
    artists = JSON.parse(artists);


    var i = getInt(0, NUMARTIST);
    const url = "https://api.spotify.com/v1/artists/" + artists[i].id + "/related-artists";


    const config: AxiosRequestConfig = {
      url: url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        limit: NUMARTIST,
        time_range: "medium_term",
      },
    };
    const response = await axios(config);
    
    var res: any = [];
    response.data.artists.forEach((item: any) => {
      console.log(item.id)
      console.log(item.images[0].url)
      console.log(item.name)
      res.push({
        id: item.id,
        imageUri: item.images[0].url,
        artistName: item.name,
      });
    });
    //console.log(res)
    storeData("@relatedArtist", JSON.stringify(res));
    //console.log(res)
    return res;
  }
);
