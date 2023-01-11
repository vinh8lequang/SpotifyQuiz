import React, { useEffect, useState } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import styles from "./styles";
import { ArtistStatsType } from "../../types";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

export type ArtistStatsProps = {
  artist: ArtistStatsType;
  podium: boolean;
};

const ArtistStats = (props: ArtistStatsProps) => {
  //get the dimensions to fit all phone devices
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const onChange = ({
      window: { width, height },
    }: {
      window: { width: number; height: number };
    }) => {
      setScreenHeight(height);
      setScreenWidth(width);
    };

    const removeChangeListener = Dimensions.addEventListener(
      "change",
      onChange
    );
    return () => {
      removeChangeListener.remove();
    };
  }, []);

  const isTablet = screenWidth > screenHeight;
  var imagePodiumSize, marginTop, marginBottom;
  if (isTablet) {
    imagePodiumSize = screenHeight / 4;
    marginTop = screenHeight / 60;
    marginBottom = marginTop;
  } else {
    imagePodiumSize = screenHeight / 9.2;
    marginTop = screenHeight / 100;
    marginBottom = marginTop;
  }

  var imageSize = responsiveScreenHeight(8);
  if (props.podium) {
    return (
      <View style={[styles.container, { marginTop, marginBottom }]}>
        <Image
          source={{ uri: props.artist.imageUri }}
          style={[
            styles.image,
            {
              width: imagePodiumSize,
              height: imagePodiumSize,
              maxWidth: imagePodiumSize,
            },
          ]}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.textArtist}>{props.artist.artistName}</Text>
          <Text style={styles.textPoints}>
            Points: {props.artist.puntuation}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, { marginTop, marginBottom }]}>
        <Image source={{ uri: props.artist.imageUri }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.textArtist}>{props.artist.artistName}</Text>
          <Text style={styles.textPoints}>
            Points: {props.artist.puntuation}
          </Text>
        </View>
      </View>
    );
  }
};

export default ArtistStats;
