import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import { Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { albumsSelector, fetchAlbum } from "../../redux/slices/Albums";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQuestionAlbum,
  generateQuestionTrack,
} from "../../services/questionManager";
import styles from "./styles";
import { fetchTracks, tracksSelector } from "../../redux/slices/tracks";
import getInt from "../../services/getRandomInt";
import { useNavigation } from "@react-navigation/native";
import { getData, storeData } from "../../utils/storage";

export default function QuizScreen() {
  //get the height dimension to fit all phone devices
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = (result: {
      window: { width: number; height: number };
    }) => {
      setScreenHeight(result.window.height);
    };
    const removeChangeListener = Dimensions.addEventListener(
      "change",
      onChange
    );
    return () => {
      removeChangeListener.remove();
    };
  }, []);

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
  const [highScore, setHighScore] = useState(0);
  const [color, setColor] = useState(initialColors);
  const [alter, setAlter] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(albumsSelector);
  const { data: data2 } = useSelector(tracksSelector);
  const navigation = useNavigation();

  // const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  // setTimeout(() => {
  //   setIsLoadingLocal(false);
  // }, 500);

  // console.log("isLoading albums", isLoading);

  function onResponse(e: any, f: any) {
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

  //comparing and updating highscore
  const compareAndUpdateHighScore = async (newScore: number) => {
    const currentHighScore = await getData("@highScore");
    if (currentHighScore === null || newScore > parseInt(currentHighScore)) {
      await storeData("@highScore", newScore.toString());
    }
    //Debug
    const highScoreFetched = await getData("@highScore");
    console.log("Score", newScore);
    console.log("HighScoreFromFetch", highScoreFetched);
    setHighScore(highScoreFetched);
  };
  useEffect(() => {
    const update = async () => {
      await compareAndUpdateHighScore(score);
    };
    update();
  }, [score]);

  // if (isLoadingLocal) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  if (lifes > 0) {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.containerScoreandLives}>
          <View style={styles.containerLives}>
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
          </View>
          <Text style={styles.score}>{"Score: " + score}</Text>
        </View>
        <View style={styles.container}>
          <Image source={{ uri: question.image }} style={styles.image} />
          <Text style={styles.questionText}>{question.question}</Text>
          <View
            style={[
              styles.answersContainer,
              { height: screenHeight - screenHeight * 0.6 },
            ]}
          >
            <Pressable
              style={color[0]}
              onPress={() => {
                onResponse(question.answers[3], 0);
              }}
            >
              <Text style={styles.textAnswer}>{question.answers[3]}</Text>
            </Pressable>
            <Pressable
              style={color[1]}
              onPress={() => {
                onResponse(question.answers[2], 1);
              }}
            >
              <Text style={styles.textAnswer}>{question.answers[2]}</Text>
            </Pressable>
            <Pressable
              style={color[2]}
              onPress={() => {
                onResponse(question.answers[1], 2);
              }}
            >
              <Text style={styles.textAnswer}>{question.answers[1]}</Text>
            </Pressable>
            <Pressable
              style={color[3]}
              onPress={() => {
                onResponse(question.answers[0], 3);
              }}
            >
              <Text style={styles.textAnswer}>{question.answers[0]}</Text>
            </Pressable>
          </View>
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
        <Text style={styles.questionText}>
          SORRY YOU HAVE LOST ALL YOUR LIVES
        </Text>
        <Text style={styles.scoresText}>Current score: {score}</Text>
        <Text style={styles.scoresText}>High score: {highScore}</Text>
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
