import React from "react";
import { Text, View, FlatList } from "react-native";
import { ArtistHomeType } from "../../types";
import ArtistHome from "../ArtistHome";
import styles from "./styles";

export type TopArtistsHomeProps = {
  title: string;
  artists?: [ArtistHomeType];
};

const TopArtistsHome = (props: TopArtistsHomeProps) => {
  var propsSliced = props.artists?.slice(0, 12);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        data={propsSliced}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => <ArtistHome artist={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TopArtistsHome;
