import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import {ArtistHomeType} from "../../types"

export type ArtistHomeProps = {
    artist: ArtistHomeType
}

const ArtistHome = (props:ArtistHomeProps) => {
    return (
    <View style={styles.container}>
        <Image source={{uri: props.artist.imageUri}} style={styles.image} />
        <Text style={styles.text}>{props.artist.artistName}</Text>
    </View>
    )
}




export default ArtistHome;