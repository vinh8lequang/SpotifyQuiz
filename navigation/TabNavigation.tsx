import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import StackHomeNavigation from "./StackHomeNavigation";
import Stats from "../screens/Stats";
import Discovery from "../screens/Discovery";
import Achievements from "../screens/Achievements";
import Colors from "../tabBarColors/Colors";
import useColorScheme from "../tabBarColors/useColorScheme";

const Tabs = createBottomTabNavigator();
const TabNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Scoreboard") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if (route.name === "Discovery") {
              iconName = focused ? "compass" : "compass-outline";
            } else if (route.name === "Achievements") {
              iconName = focused ? "trophy" : "trophy-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors[colorScheme].tint,
        })}
      >
        <Tabs.Screen
          name="Home"
          component={StackHomeNavigation}
          options={{ headerShown: false }}
        />
        <Tabs.Screen
          name="Scoreboard"
          component={Stats}
          options={{ headerShown: false }}
        />
        <Tabs.Screen
          name="Discovery"
          component={Discovery}
          options={{ headerShown: false }}
        />
        <Tabs.Screen
          name="Achievements"
          component={Achievements}
          options={{ headerShown: false }}
        />
      </Tabs.Navigator>
    </>
  );
};

export default TabNavigation;
