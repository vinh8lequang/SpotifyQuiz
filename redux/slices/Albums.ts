import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/storage";
import axios, { AxiosRequestConfig } from "axios";
import { RootState } from "..";
import { apiEndpoints } from "../../services/api";
import getInt from "../../services/getRandomInt";





interface Albums{
  isLoading: boolean;
  data: [];
  isError: boolean;
}

const initialState: Albums = {
  isLoading: false,
  data: [{
        artist:'',
        id: '',
        release_date: '',
        imageUri: 'https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg',
        albumName: '',
  },
{
        id: '',
        release_date: '',
        imageUri: 'https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg',
        albumName: '',
  },
{
        id: '',
        release_date: '',
        imageUri: 'https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg',
        albumName: '',
  },
{
        id: '',
        release_date: '',
        imageUri: 'https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg',
        albumName: '',
  },
{
        id: '',
        release_date: '',
        imageUri: 'https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg',
        albumName: '',
  }],
  isError: false,
};

const albums = createSlice({
  name: "albums",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

  const getArtist = async () => {
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
        limit: 20,
        time_range: "medium_term",
      },
    };
    const response = await axios(config);
    return response.data;
  }

export const albumsSelector = (state: RootState) =>state.albums;

export default albums.reducer;

export const fetchAlbum = createAsyncThunk(
  "/user/albums",
  async () => {
    const artists = await getArtist()
   // console.log(artists.items[0].name)
    var res =[]
    artists.items.forEach((item: any) => {
      
    });
    const token = await getData("@access_token");
    // console.log("Token", token);
    var  i = getInt(0, 19);
    const url = 	'https://api.spotify.com/v1/artists/'+artists.items[i].id+'/albums'
    const config: AxiosRequestConfig = {
      url: url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        limit: 4,
        time_range: "medium_term",
      },
    };
    const response = await axios(config);
    response.data.items.forEach((item: any) => {
      res.push({
        artists:artists.items[i].name,
        id: item.id,
        release_date: item.release_date,
        imageUri: item.images[0].url,
        albumName: item.name,
      })
    })

    var  j = getInt(0, 19);
    if(i==j && i==19){j=i-1}
    if(i==j){j=i+1}
    const url2 = 	'https://api.spotify.com/v1/artists/'+artists.items[j].id+'/albums'
    const config2: AxiosRequestConfig = {
      url: url2,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        limit: 1,
        time_range: "medium_term",
      },
    };
    const response2 = await axios(config2);
    response2.data.items.forEach((item: any) => {
      res.push({
        artists:artists.items[j].name,
        id: item.id,
        release_date: item.release_date,
        imageUri: item.images[0].url,
        albumName: item.name,
      })
    })

    //console.log(res)

    return res;}

);