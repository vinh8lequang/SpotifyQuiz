import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TopArtistsHome from '../components/TopArtistsHome';
import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';
import { useDispatch } from 'react-redux';

export default function TabTwoScreen() {
  const firstState ={         
                artistName:'',
                imageUri:'',
                puntuation: 1,
                id:''}

  const[artist,setArtist] = useState()

  useEffect(() => {
     const  getArtist=async () => {
        var res =  await getData("@relevantArtist");
        setArtist(JSON.parse(res))
        console.log(artist)
     }
    getArtist()

  },[])
  return (
    <View style={styles.container}>
      <TopArtistsHome title="Your Most Known artists" artists={artist} />
      <Text style={styles.title}>Tab Two</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
