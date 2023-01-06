import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { ArtistStatsType } from "../../types";

export type ArtistStatsProps = {
  artist: ArtistStatsType;
};

const ArtistStats = (props: ArtistStatsProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.artist.imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.textArtist}>{props.artist.artistName}</Text>
        <Text style={styles.textPoints}>Points: {props.artist.puntuation}</Text>
      </View>
    </View>
  );
};

export default ArtistStats;
