import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/storage";
import axios, { AxiosRequestConfig } from "axios";
import { RootState } from "..";
import { apiEndpoints } from "../../services/api";
import getInt from "../../services/getRandomInt";
import { shuffle } from "../../services/getRandomInt";
import { storeData } from "../../utils/storage";
import { getInt2 } from "../../services/getRandomInt";

const NUMARTIST = 10;
const NUMALBUMS = 10
const NUMALBUMS2= 6;

var lastArtist= ''

interface Albums{
  isLoading: boolean;
  data: [];
  isError: boolean;
}

//DECLARE INITIAL STATE OF THE DATA

const initialState: Albums = {
  isLoading: false,
  data: [{
        artistImage:'https://www.elegantthemes.com/blog/wp-content/uploads/2019/10/loading-screen-featured-image.jpg',
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

//CREATE THE SLICE AND SET THE REDUCERS


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

export const albumsSelector = (state: RootState) =>state.albums;

export default albums.reducer;


//GET THE ALBUMS

export const fetchAlbum = createAsyncThunk(
  "/user/albums",
  async () => {
    var artists = await getData("@topArtis");
    artists = JSON.parse(artists)
    var res =[]
    const token = await getData("@access_token");
    var  i = getInt(0, NUMARTIST);
    const url = 	'https://api.spotify.com/v1/artists/'+artists[i].id+'/albums'
    const config: AxiosRequestConfig = {
      url: url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        limit: NUMALBUMS,
        time_range: "medium_term",
      },
    };
    const response = await axios(config);
    var p= []
    for(var h=0;h<NUMALBUMS;h++){
      p.push(h)
    }
    p  = shuffle(p);
    for(var j = 0;j<4;j++){
      res.push({
        artistsImage:artists[i].imageUri,
        artists: artists[i].artistName,
        id: response.data.items[p[j]].id,
        release_date:  response.data.items[p[j]].release_date,
        imageUri:  response.data.items[p[j]].images[0].url,
        albumName:  response.data.items[p[j]].name,
      })
    }
    

    var  j = getInt2(0, NUMARTIST,i)
    const url2 = 	'https://api.spotify.com/v1/artists/'+artists[j].id+'/albums'
    const config2: AxiosRequestConfig = {
      url: url2,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        limit: 5,
        time_range: "medium_term",
      },
    };
    const response2 = await axios(config2);
    var p= []
    for(var h=0;h<NUMALBUMS2;h++){
      p.push(h)
    }
    p  = shuffle(p);

      res.push({
        artistsImage:artists[j].imageUri,
        artists:artists[j].artistName,
        id: response2.data.items[p[0]].id,
        release_date: response2.data.items[p[0]].release_date,
        imageUri:  response2.data.items[p[0]].images[0].url,
        albumName:  response2.data.items[p[0]].name,
      })
    
      storeData("@albums", JSON.stringify(res));
    

    return res;}

);