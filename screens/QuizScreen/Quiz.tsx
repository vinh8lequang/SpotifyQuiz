import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Button,
} from "react-native";
import { Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { albumsSelector, fetchAlbum } from "../../redux/slices/Albums";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQuestionAlbum,
  generateQuestionTrack,
  generateSpecialQuestion,
} from "../../services/questionManager";
import styles from "./styles";
import { fetchTracks, tracksSelector } from "../../redux/slices/tracks";
import { getData, storeData } from "../../utils/storage";
import relevantArtist from "../../services/RelevantArtist";
import achievementsUpdater from "../../services/achievementsUpdater";
import { Audio } from "expo-av";
import getInt from "../../services/getRandomInt";

const Quiz = ({ navigation }: any) => {
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

  var initialState = {
    type: "",
    question: "",
    answers: ["", "", "", ""],
    correct: "",
    image:
      "https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=2000",
    previewUrl:
      "https://cdn.pixabay.com/download/audio/2022/06/25/audio_4ca472b499.mp3?filename=lofi-vibes-113884.mp3",
    aux: {
      artist: "",
      url: "",
    },
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
  const [specialQuestion, setSpecialQuestion] = useState(0);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(albumsSelector);
  const { data: data2 } = useSelector(tracksSelector);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: question.previewUrl,
    });
    //@ts-ignore
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    setIsPlaying(true);
  }

  async function pauseSound() {
    console.log("Pausing Sound");
    //@ts-ignore
    await sound?.pauseAsync();
    setIsPlaying(false);
  }

  async function togglePlayback() {
    if (isPlaying) {
      pauseSound();
    } else {
      playSound();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          //@ts-ignore
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  // setTimeout(() => {
  //   setIsLoadingLocal(false);
  // }, 500);

  // console.log("isLoading albums", isLoading);

  function onResponse(e: any, f: any) {
    var nq = specialQuestion + 1;
    if (e == question.correct) {
      var ns = score + 1;
      var c = color;
      //@ts-ignore
      c[f] = styles.buttonCorrect;
      setColor(c);
      //update artists scoreboard
      relevantArtist(question.aux.artist, question.aux.url);
      //update achievements
      achievementsUpdater(question.type);
      if (specialQuestion == 5) {
        nq = 0;
        console.log("reinicio");
        ns = ns + 2;
        pauseSound();
      }
      setTimeout(() => {
        setScore(ns);
        setColor(initialColors);
        setSpecialQuestion(nq);
      }, 1000);
    } else {
      var c = color;
      //@ts-ignore
      c[f] = styles.buttonIncorrect;
      setColor(c);
      if (specialQuestion == 5) {
        nq = 0;
        console.log("reinicio");
        pauseSound();
      }
      setTimeout(() => {
        var nl = lifes - 1;
        setLifes(nl);
        setColor(initialColors);
        setSpecialQuestion(nq);
      }, 1000);
    }

    if (specialQuestion == 4) {
      //@ts-ignore
      dispatch(fetchTracks());

      console.log("Debug------SPECIAL--------------");
      setTimeout(() => {
        setQuestion(generateSpecialQuestion(data2));
      }, 1000);
      setAlter(true);
    } else {
      if (alter == false) {
        //@ts-ignore
        dispatch(fetchTracks());
        console.log("Debug------TRACKS--------------");
        setTimeout(() => {
          //@ts-ignore
          setQuestion(generateQuestionTrack(data2));
        }, 1000);
        setAlter(true);
      } else {
        //@ts-ignore
        dispatch(fetchAlbum());

        console.log("Debug----ALBUMS--------------");

        setTimeout(() => {
          //@ts-ignore
          setQuestion(generateQuestionAlbum(data));
        }, 1000);
        setAlter(false);
      }
    }
    // console.log(specialQuestion)
  }

  useEffect(() => {
    const fetchDataAlbums = async () => {
      // @ts-ignore
      await dispatch(fetchAlbum());
    };
    fetchDataAlbums();
    const fetchDataTracks = async () => {
      // @ts-ignore
      await dispatch(fetchTracks());
    };
    fetchDataTracks();
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
    //console.log("Score", newScore);
    //console.log("HighScoreFromFetch", highScoreFetched);
    setHighScore(highScoreFetched);
  };
  useEffect(() => {
    const update = async () => {
      await compareAndUpdateHighScore(score);
    };
    update();
  }, [score]);

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  const isTablet = screenWidth > screenHeight;
  var flexDirection, height, width;
  if (isTablet) {
    flexDirection = "row";
    height = screenHeight * 0.45;
    width = height;
  } else {
    flexDirection = "column";
    height = screenHeight * 0.3;
    width = height;
  }

  if (lifes > 0 && specialQuestion != 5) {
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
        <View style={[styles.container, { flexDirection }]}>
          <View style={styles.topHalfContainer}>
            <Image
              source={{ uri: question.image }}
              style={[styles.image, { height, width }]}
            />
            <Text style={styles.questionText}>{question.question}</Text>
          </View>
          <View
            style={[
              styles.answersContainer,
              { maxHeight: screenHeight - screenHeight * 0.7 },
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
  } else if (lifes > 0 && specialQuestion == 5) {
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
        <View style={[styles.container, { flexDirection }]}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              title={isPlaying ? "Pause" : "Play"}
              onPress={togglePlayback}
            />
            <Text style={styles.questionText}>{question.question}</Text>
          </View>
          <View
            style={[
              styles.answersContainer,
              { maxHeight: screenHeight - screenHeight * 0.7 },
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
      <View
        style={[
          styles.parentContainer,
          { flexDirection, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View>
          <Image
            source={{
              uri: "https://media1.giphy.com/media/VM01S5yIaKCgqg1bSF/giphy.gif?cid=ecf05e47wsx84h8uxwgbb63qrft1wc6vv3uij6si6micx29r&rid=giphy.gif&ct=g",
            }}
            style={[styles.image, { height, width }]}
          />
          <Text style={styles.questionText}>YOU HAVE LOST ALL YOUR LIVES</Text>
          <Text style={styles.scoresText}>Current score: {score}</Text>
          <Text style={styles.scoresText}>High score: {highScore}</Text>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("HomeStack", { screen: "Home" });
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
};

export default Quiz;
