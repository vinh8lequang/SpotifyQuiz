import React from "react";
import {
    Text,
    View,
  } from "react-native";

const Stats = ({navigation}:any) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is stats</Text>
            <Text
            onPress={()=> navigation.navigate("Home")}
            >Click here to go to "Home"</Text>
        </View>
        )
}

export default Stats;