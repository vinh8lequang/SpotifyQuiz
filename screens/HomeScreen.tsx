import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import TopArtistsHome from '../components/TopArtistsHome';
import topArtistsData from '../data/topArtistsData';
import PlayComponent from '../components/PlayComponent';

// export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
export default function HomeScreen() {

  return (
    <>
    <View style={styles.topArtistsContainer}>
      <TopArtistsHome title='Your top artists' artists={topArtistsData.artists}/>
    </View>
    <View style={styles.bottomContainer}>
      <PlayComponent/>
    </View>
    </>
  );
}

const styles = StyleSheet.create( {
  topArtistsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
});
