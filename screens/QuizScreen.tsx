import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text,StyleSheet,Button } from "react-native";
import Question from "../components/Question/question";
import { AntDesign } from "@expo/vector-icons";



const styles = StyleSheet.create({
    containerLifes:{
        flexDirection: "row-reverse",
        marginTop: 15,
        marginLeft:10,
        marginBottom:0
    },
    lifeActive:{
        height:17,
        width:17,
        color: "red",
        marginBottom:0
    },
    lifeLoss:{
        height:17,
        width:17,
        marginBottom:0
    },
    score:{
        marginRight:100,
        fontWeight: "bold"
        }
});


export default function QuizScreen(){
    const [lifes,setLifes] = useState('')
    
        

       return(            
        <View>
            <View style={styles.containerLifes}>
                <AntDesign name="heart"style={styles.lifeActive}></AntDesign>
                <AntDesign name="heart"style={styles.lifeActive}></AntDesign>
                <AntDesign name="heart"style={styles.lifeLoss}></AntDesign>
                <Text style={styles.score}>Score: 0</Text>
            </View>
            <Question></Question>
            <Text style={{color: 'white', fontSize: 30}}></Text>
        </View>
        );

        
            
};


const QuizScreen = () => (
    <View>
        <Text style={{color: 'white', fontSize: 30}}>Hello from quiz screen</Text>
    </View>
)

export default QuizScreen;