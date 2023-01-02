import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { albumsSelector, fetchAlbum } from "../../redux/slices/Albums";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  generateQuestionAlbum,
  generateQuestionTrack,
} from "../../services/questionManager";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { fetchTracks, tracksSelector } from "../../redux/slices/tracks";
import getInt from "../../services/getRandomInt";
import { useNavigation } from "@react-navigation/native";

export default function QuizScreen() {
  var initialState = {
    question: "",
    answers: ["", "", "", ""],
    correct: "",
    image:
      "https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=2000",
  };

  var initialColors = [
    styles.button,
    styles.button,
    styles.button,
    styles.button,
  ];

  const [lifes, setLifes] = useState(3);
  const [question, setQuestion] = useState(initialState);
  const [score, setScore] = useState(0);
  const [color, setColor] = useState(initialColors);
  const [alter, setAlter] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector(albumsSelector);
  const { data: data2 } = useSelector(tracksSelector);
  const navigation = useNavigation();

  function onResponse(e, f) {
    if (e == question.correct) {
      var c = color;
      c[f] = styles.buttonCorrect;
      setColor(c);
      setTimeout(() => {
        var ns = score + 1;
        setScore(ns);
        setColor(initialColors);
      }, 1000);
    } else {
      var c = color;
      c[f] = styles.buttonIncorrect;
      setColor(c);
      setTimeout(() => {
        var nl = lifes - 1;
        setLifes(nl);
        setColor(initialColors);
      }, 1000);
    }
    setTimeout(() => {});
    if (alter == false) {
      dispatch(fetchTracks());

      console.log("Debug------TRACKS--------------");
      setTimeout(() => {
        setQuestion(generateQuestionTrack(data2));
      }, 1000);
      setAlter(true);
    } else {
      dispatch(fetchAlbum());

      console.log("Debug----ALBUMS--------------");

      setTimeout(() => {
        setQuestion(generateQuestionAlbum(data));
      }, 1000);
      setAlter(false);
    }
  }

  useEffect(() => {
    dispatch(fetchAlbum());

    console.log("Debug---------FIRST LOAD-------------");

    setQuestion(generateQuestionAlbum(data));
  }, []);

  if (lifes > 0) {
    return (
      <View>
        <View style={styles.containerLifes}>
          <AntDesign
            name="heart"
            style={lifes > 0 ? styles.lifeActive : styles.lifeLoss}
          ></AntDesign>
          <AntDesign
            name="heart"
            style={lifes > 1 ? styles.lifeActive : styles.lifeLoss}
          ></AntDesign>
          <AntDesign
            name="heart"
            style={lifes > 2 ? styles.lifeActive : styles.lifeLoss}
          ></AntDesign>
          <Text style={styles.score}>{"Score: " + score}</Text>
        </View>
        <View style={styles.container}>
          <Image source={{ uri: question.image }} style={styles.image} />
          <Text style={styles.QuestionText}>{question.question}</Text>
          <ScrollView>
            <Pressable
              style={color[0]}
              onPress={() => {
                onResponse(question.answers[3], 0);
              }}
            >
              <Text style={styles.textAwnser}>{question.answers[3]}</Text>
            </Pressable>
            <Pressable
              style={color[1]}
              onPress={() => {
                onResponse(question.answers[2], 1);
              }}
            >
              <Text style={styles.textAwnser}>{question.answers[2]}</Text>
            </Pressable>
            <Pressable
              style={color[2]}
              onPress={() => {
                onResponse(question.answers[1], 2);
              }}
            >
              <Text style={styles.textAwnser}>{question.answers[1]}</Text>
            </Pressable>
            <Pressable
              style={color[3]}
              onPress={() => {
                onResponse(question.answers[0], 3);
              }}
            >
              <Text style={styles.textAwnser}>{question.answers[0]}</Text>
            </Pressable>
          </ScrollView>
        </View>
        <Text style={{ color: "white", fontSize: 30 }}></Text>
      </View>
    );
  } else {
    return (
      <View>
        <Image
          source={{
            uri: "https://media1.giphy.com/media/VM01S5yIaKCgqg1bSF/giphy.gif?cid=ecf05e47wsx84h8uxwgbb63qrft1wc6vv3uij6si6micx29r&rid=giphy.gif&ct=g",
          }}
          style={styles.image}
        />
        <Text style={styles.QuestionText}>SORRY YOU LOST ALL YOUR LIFES</Text>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <View>
              <Text>Go Back to Menu</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setLifes(3);
              setScore(0);
            }}
          >
            <View>
              <Text>Play Again</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}
