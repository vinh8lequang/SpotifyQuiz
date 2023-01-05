import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Quiz from "../screens/QuizScreen/Quiz";

const Stack = createStackNavigator();

const StackHomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeStack"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Quiz"
        component={Quiz}
      />
    </Stack.Navigator>
  );
};

export default StackHomeNavigation;
