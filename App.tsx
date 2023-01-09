import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Login from "./screens/Login";
import TabNavigation from "./navigation/TabNavigation";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import { getData } from "./utils/storage";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await getData("@access_token");
    if (!user) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#141414" }}>
        <NavigationContainer
          theme={{
            //Spotify's colors
            dark: true,
            colors: {
              primary: "#1DB954",
              background: "black",
              card: "#141414",
              text: "#ffffff",
              border: "#282525",
              notification: "#ffffff",
            },
          }}
        >
          <Stack.Navigator>
            {/* {!isAuthenticated ? (
                <>
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={Login}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="HomeTab"
                    component={TabNavigation}
                  />
                </>
              ) : (
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="HomeTab"
                  component={TabNavigation}
                />
              )} */}

            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeTab"
              component={TabNavigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar />
      </SafeAreaView>
    </Provider>
  );
}
