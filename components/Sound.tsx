import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { Audio } from "expo-av";

const Sound = ({ navigation }: any,props:any) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlaybackStatusUpdate = (status: any) => {
    console.log("onPlaybackStatusUpdate", status);
  };

  // windowsxp uri: "https://www.myinstants.com/media/sounds/preview_4.mp3",
  // jazz uri: "https://cdn.pixabay.com/download/audio/2022/06/25/audio_4ca472b499.mp3?filename=lofi-vibes-113884.mp3",
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: props.url,
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text onPress={() => navigation.navigate("Home")}>
        Click here to go to "Home"
      </Text> */}
      <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayback} />
    </View>
  );
};

export default Sound;
