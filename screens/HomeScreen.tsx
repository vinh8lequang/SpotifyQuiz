import { ActivityIndicator, Button, StyleSheet } from "react-native";
import { View } from "react-native";
import TopArtistsHome from "../components/TopArtistsHome";
import PlayComponent from "../components/PlayComponent";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  fetchTopUserArtists,
  topUserArtistsSelector,
} from "../redux/slices/topUserArtists";
import { useSelector } from "react-redux";
import { fetchTopTracks, topTracksSelector } from "../redux/slices/topTracks";
import { ScrollView } from "react-native-gesture-handler";

// export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
export default function HomeScreen() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(topUserArtistsSelector);
  const{data:data2}= useSelector(topTracksSelector)
  useEffect( () => {
    dispatch(fetchTopUserArtists());
    dispatch(fetchTopTracks())
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.topArtistsContainer}>
        <TopArtistsHome title="Your top artists" artists={data} />
      </View>
      <View style={styles.bottomContainer}>
        <PlayComponent />
      </View>
      <View style={styles.topArtistsContainer}>
        <TopArtistsHome title="Your top tracks" artists={data2} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topArtistsContainer: {
    flex:1,
   
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#2C3333',
    borderRadius:15,
  },
  bottomContainer: {

    marginVertical:15,
    marginHorizontal:10
  
  },
});
