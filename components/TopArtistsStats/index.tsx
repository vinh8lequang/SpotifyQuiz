import React from "react";
import { Text, View, FlatList } from "react-native";
import { ArtistStatsType } from "../../types";
import ArtistStats from "../ArtistStats";
import styles from "./styles";

export type TopArtistsStatsProps = {
  title: string;
  artists?: [ArtistStatsType];
  podium: boolean;
};

const TopArtistsStats = (props: TopArtistsStatsProps) => {
  // var propsSliced = props.artists?.slice(0, 12);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        data={props.artists}
        renderItem={({ item }) => (
          <ArtistStats artist={item} podium={props.podium} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TopArtistsStats;
