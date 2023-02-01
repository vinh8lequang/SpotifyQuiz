import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  StatusBar,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from "react-native";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import { storeData } from "../utils/storage";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../redux/slices/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import achievementsInit from "../services/achievementsInit";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const Login = ({ navigation }: any) => {
  // useEffect(() => {
  //   AsyncStorage.removeItem("@access_token")
  //     .then(() => {
  //       console.log("Access token removed previous session");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const dispatch = useDispatch();
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  // Vinh credentials
  // 8642ecf50be54c2a8364aa5468cfc026
  // b906d73f00764c7abee0aba9546533d1
  // exp://192.168.178.48:19000

  //fedd082c6f404c478a8653a73819d2e6
  //eedba51259ca450bb63a7cbfb04e5a97
  //exp://192.168.1.161:19000

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "8642ecf50be54c2a8364aa5468cfc026",
      clientSecret: "b906d73f00764c7abee0aba9546533d1",
      scopes: [
        "ugc-image-upload",
        "user-read-playback-state",
        "user-modify-playback-state",
        //    "user-read-currently-playing",
        "streaming",
        "app-remote-control",
        "user-read-email",
        "user-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-read-private",
        "playlist-modify-private",
        "user-library-modify",
        "user-library-read",
        "user-top-read",
        "user-read-playback-position",
        "user-read-recently-played",
        //      "user-follow-read",
        //      "user-follow-modify",
      ],
      usePKCE: false,
      redirectUri: "exp://192.168.178.48:19000",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      // AsyncStorage.removeItem("@topArtis");
      // AsyncStorage.removeItem("@relevantArtist");
      // AsyncStorage.removeItem("@achievements");
      // AsyncStorage.removeItem("@highScore");
      const { access_token } = response.params;
      // console.log("accessToken", access_token);
      storeData("@access_token", access_token);
      //@ts-ignore
      dispatch(getCurrentUser(access_token));
      achievementsInit(); //initialize achievements storage
      navigation.navigate("HomeTab", { screen: "Home" });
    }
  }, [response]);

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    spin();
  }, []);

  const spin = () => {
    spinValue.setValue(0);
    const randomSpeed = Math.random() * 3000 + 2000; //random duration from 2s to 5s
    Animated.timing(spinValue, {
      toValue: 1,
      duration: randomSpeed,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(spin);
  };

  const spinImage = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.containter}>
      <View style={styles.fillerContainter}></View>
      <View style={styles.halfContainter}>
        <Animated.Image
          source={{ uri: "https://i.postimg.cc/s2VTqxfT/vinyl.png" }}
          style={[
            styles.image,
            {
              transform: [{ rotate: spinImage }],
              // width: 80,
              // height: 80,
              // maxWidth: 80,
            },
          ]}
        />
        <Image
          source={{ uri: "https://i.postimg.cc/D0tCMcmG/logo.png" }}
          style={styles.titleImage}
        />
      </View>
      <View style={styles.loginContainter}>
        <TouchableOpacity onPress={() => promptAsync()}>
          <View style={styles.loginButton}>
            <Text style={styles.text}>Login with Spotify</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  halfContainter: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainter: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  fillerContainter: {
    flex: 2,
  },
  loginButton: {
    backgroundColor: "#1DB954",
    width: wWidth * 0.5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  title: {
    color: "#1DB954",
    fontSize: 30,
    fontWeight: "bold",
  },
  titleImage: {
    width: 254,
    height: 94,
    maxWidth: 254,
  },
  image: {
    width: 180,
    height: 180,
    maxWidth: 180,
  },
});

export default Login;
