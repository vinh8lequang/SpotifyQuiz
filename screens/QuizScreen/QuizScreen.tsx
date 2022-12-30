import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Image,Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { albumsSelector, fetchAlbum } from "../../redux/slices/Albums";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import generateQuestion from "../../services/AlbumQuestion";
import styles from "./styles";




export default function QuizScreen() {

  var initialState={
    
                question: '' ,
                answers:[
                    '',
                    '',
                    '',
                    '',

                ],
                correct:'',
                image:'https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=2000'

            }

  const [lifes, setLifes] = useState(3);
  const [question, setQuestion] = useState(initialState);
  const[score,setScore] = useState(0);
  const dispatch = useDispatch();
  const { data } = useSelector(albumsSelector);

  
  
  

 

  function onResponse(e){
    if(e == question.correct){
      var ns = score+1
      setScore(ns)
    }else{
      var nl= lifes-1
      setLifes(nl)
    }

    dispatch(fetchAlbum());
    
    console.log("Debug------------------------------");

    setQuestion(generateQuestion(data));
  }

  useEffect( () => {
    dispatch(fetchAlbum());
    
    console.log("Debug------------------------------");

    setQuestion(generateQuestion(data));
  },[]);





  return (
    <View>
      <View style={styles.containerLifes}>
        <AntDesign name="heart" style={(lifes > 0) ? styles.lifeActive :styles.lifeLoss}></AntDesign>
        <AntDesign name="heart" style={(lifes > 1) ? styles.lifeActive :styles.lifeLoss}></AntDesign>
        <AntDesign name="heart" style={(lifes > 2) ? styles.lifeActive :styles.lifeLoss}></AntDesign>
        <Text style={styles.score}>{'Score: '+ score}</Text>
      </View>
      <View style={styles.container}>
        <Image source={{uri:question.image}}style={styles.image}/>
        <Text style={styles.QuestionText}>{question.question}</Text>
        <Pressable style={styles.button} onPress={()=>{onResponse(question.answers[3])}}><Text style={styles.textAwnser}>{question.answers[3]}</Text></Pressable>
        <Pressable style={styles.button} onPress={()=>{onResponse(question.answers[2])}}><Text style={styles.textAwnser}>{question.answers[2]}</Text></Pressable>
        <Pressable style={styles.button} onPress={()=>{onResponse(question.answers[1])}}><Text style={styles.textAwnser}>{question.answers[1]}</Text></Pressable>
        <Pressable style={styles.button} onPress={()=>{onResponse(question.answers[0])}}><Text style={styles.textAwnser}>{question.answers[0]}</Text></Pressable>
    </View>
      <Text style={{ color: "white", fontSize: 30 }}></Text>
    </View>
  );
}
