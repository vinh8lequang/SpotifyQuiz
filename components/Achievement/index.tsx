import React, { useRef, useEffect } from "react";
import { View, Image, Text, Animated, Easing } from "react-native";
import styles from "./styles";
import { AchievementType } from "../../types";

export type AchievementProps = {
  achievement: AchievementType;
};

const Achievement = (props: AchievementProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.achievement.unlocked) {
      spin();
    }
  }, [props.achievement.unlocked]);

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
    <View style={styles.container}>
      {props.achievement.unlocked ? (
        <Animated.Image
          source={{ uri: props.achievement.imageUri }}
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
      ) : (
        <Image
          source={{ uri: props.achievement.imageUri }}
          style={styles.image}
        />
      )}
      <View style={styles.infoContainer}>
        {!props.achievement.unlocked ? (
          <>
            <Text style={styles.textNameLocked}>{props.achievement.id}</Text>
            <Text style={styles.textDescLocked}>{props.achievement.desc}</Text>
            <Text style={styles.textStatusLocked}>LOCKED. Keep playing!</Text>
          </>
        ) : (
          <>
            <Text style={styles.textNameUnlocked}>{props.achievement.id}</Text>
            <Text style={styles.textDescUnlocked}>
              {props.achievement.desc}
            </Text>
            <Text style={styles.textStatusUnlocked}>UNLOCKED</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Achievement;
