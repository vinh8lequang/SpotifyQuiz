import React, { useEffect, useState } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import styles from "./styles";
import { ArtistHomeType } from "../../types";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export type ArtistHomeProps = {
  artist: ArtistHomeType;
};

const ArtistHome = (props: ArtistHomeProps) => {
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
  var width, height, maxWidth, fontSize;
  if (isTablet) {
    width = screenWidth / 6.5;
    height = screenWidth / 6.5;
    maxWidth = screenWidth / 6.5;
    fontSize = 20;
  } else {
    width = screenWidth / 4;
    height = screenWidth / 4;
    maxWidth = screenWidth / 4;
    fontSize = 14;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.artist.imageUri }}
        style={[
          styles.image,
          {
            width,
            height,
            maxWidth,
          },
        ]}
      />
      <Text style={[styles.text, { fontSize: responsiveFontSize(1.3) }]}>
        {props.artist.artistName}
      </Text>
    </View>
  );
};

export default ArtistHome;
