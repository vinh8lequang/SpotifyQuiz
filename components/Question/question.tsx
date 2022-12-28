import React from "react";
import { View, Image, Text,Pressable } from "react-native";
import styles from "./styles";

const Question = () => {
    return (
    <View style={styles.container}>
        <Image source={{uri: 'https://i.scdn.co/image/ab6761610000e5ebb5f9e28219c169fd4b9e8379'}}style={styles.image}/>
        <Text style={styles.QuestionText}>What is the name of the latest album of The Weeknd?</Text>
        <Pressable style={styles.button} ><Text style={styles.textAwnser}>After Hours</Text></Pressable>
        <Pressable style={styles.button} ><Text style={styles.textAwnser}>Call me if you get Lost</Text></Pressable>
        <Pressable style={styles.button} ><Text style={styles.textAwnser}>Dawn Fm</Text></Pressable>
        <Pressable style={styles.button} ><Text style={styles.textAwnser}>Starboy</Text></Pressable>
    </View>
    )
}




export default Question;