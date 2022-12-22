import React from "react";
import { Text, View, FlatList } from "react-native";
import { ArtistHomeType } from "../../types";
import ArtistHome from "../ArtistHome";
import styles from "./styles"

export type TopArtistsHomeProps = {
    title: string,
    artists?: [ArtistHomeType]
}

const TopArtistsHome = (props:TopArtistsHomeProps) => {
    return (
        <View>
            <Text style={styles.title}>{props.title}</Text>
            <FlatList
                data = {props.artists}
                numColumns = {3}
                renderItem = {({item}) => <ArtistHome artist={item}/>}
                keyExtractor = {(item) => item.id}
            />
        </View>
    )
}



export default TopArtistsHome;