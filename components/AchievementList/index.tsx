import React from "react";
import { Text, View, FlatList } from "react-native";
import { AchievementType } from "../../types";
import Achievement from "../Achievement";
import styles from "./styles";

export type AchievementListProps = {
  title: string;
  achievements?: [AchievementType];
};

const AchievementList = (props: AchievementListProps) => {
  // var propsSliced = props.artists?.slice(0, 12);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        data={props.achievements}
        renderItem={({ item }) => <Achievement achievement={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default AchievementList;
