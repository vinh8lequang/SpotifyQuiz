import React from "react";
import { View, TouchableOpacity, Dimensions, Text } from "react-native";
import { StyleSheet } from "react-native";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import { storeData } from "../utils/storage";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../redux/slices/user";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: wWidth, height: wHeight } = Dimensions.get("window");

const LoginScreen = ({ navigation }: any) => {
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

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "8642ecf50be54c2a8364aa5468cfc026",
      clientSecret: "b906d73f00764c7abee0aba9546533d1",
      scopes: [
        "ugc-image-upload",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
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
        "user-follow-read",
        "user-follow-modify",
      ],
      usePKCE: false,
      redirectUri: "exp://192.168.178.48:19000",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log("accessToken", access_token);
      storeData("@access_token", access_token);
      dispatch(getCurrentUser(access_token));
      navigation.navigate("HomeScreen");
    }
  }, [response]);

  return (
    <View style={styles.containter}>
      <TouchableOpacity onPress={() => promptAsync()}>
        <View style={styles.loginButton}>
          <Text style={styles.text}>Login with Spotify</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "green",
    width: wWidth * 0.5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default LoginScreen;
