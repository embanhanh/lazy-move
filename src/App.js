// App.js
import React, { useEffect } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home/Home";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { COLORS, SIZES } from "./constants/theme";
import PracticeDetail from "./screens/Practice/PracticeDetail";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TransitionPresets } from "@react-navigation/stack";
import LazyReminder from "./components/LazyReminder/LazyReminder";
import { useNavigation } from "@react-navigation/native";
import HistoryScreen from "./screens/History/History";
import Social from "./screens/Social/Social";
import ChallengeDetail from "./screens/Social/ChallengeDetail";
import { useFonts } from "expo-font";
// Stacks cho từng tab
const HomeStack = createNativeStackNavigator();
const PracticeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const SocialStack = createNativeStackNavigator();
// Stack Navigator cho Home
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
      gestureEnabled: true,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: {
          animation: "timing",
          config: {
            duration: 300,
          },
        },
        close: {
          animation: "timing",
          config: {
            duration: 300,
          },
        },
      },
      cardStyleInterpolator: ({ current, layouts }) => ({
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      }),
    }}
  >
    <HomeStack.Screen
      name="HomeMain"
      component={Home}
      options={{ title: "Trang chủ", headerShown: false }}
    />
    <HomeStack.Screen
      name="PracticeDetail"
      component={PracticeDetail}
      options={{
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

// Màn hình cho Settings Stack
const SettingsScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Cài đặt</Text>
  </View>
);

// Stack Navigator cho Settings
const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="SettingsMain"
      component={SettingsScreen}
      options={{ title: "Cài đặt", headerShown: false }}
    />
  </SettingsStack.Navigator>
);

const HistoryStackScreen = () => (
  <HistoryStack.Navigator>
    <HistoryStack.Screen
      name="HistoryMain"
      component={HistoryScreen}
      options={{ title: "Lịch sử", headerShown: false }}
    />
  </HistoryStack.Navigator>
);

const SocialStackScreen = () => {
  return (
    <SocialStack.Navigator screenOptions={{ headerShown: false }}>
      <SocialStack.Screen name="SocialMain" component={Social} />
      <SocialStack.Screen
        name="ChallengeDetail"
        component={ChallengeDetail}
        options={{
          headerShown: false,
        }}
      />
    </SocialStack.Navigator>
  );
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    const setupNavigation = async () => {
      if (Platform.OS === "android") {
        await SystemNavigationBar.navigationHide();
        await SystemNavigationBar.stickyImmersive();
        StatusBar.setHidden(true);
      }
    };

    setupNavigation();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <Text style={{ color: COLORS.text.primary }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        hidden={true}
        translucent={true}
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "HomeStack") {
                  iconName = "home";
                } else if (route.name === "SettingsStack") {
                  iconName = "settings";
                } else if (route.name === "HistoryStack") {
                  iconName = "journal";
                } else if (route.name === "SocialStack") {
                  iconName = "people";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: COLORS.icon.active,
              tabBarInactiveTintColor: COLORS.icon.inactive,
              tabBarStyle: ((state) => {
                const routeName = getFocusedRouteNameFromRoute(route);
                const hideOnScreens = ["PracticeDetail", "ChallengeDetail"];
                return {
                  display: hideOnScreens.includes(routeName) ? "none" : "flex",
                  height: 60,
                  paddingBottom: 8,
                  paddingTop: 8,
                  backgroundColor: COLORS.primary,
                };
              })(),
              tabBarLabelStyle: {
                fontSize: SIZES.text.small,
              },
            })}
          >
            <Tab.Screen
              name="HomeStack"
              component={HomeStackScreen}
              options={{
                tabBarLabel: "Trang chủ",
                headerShown: false,
              }}
              listeners={({ navigation }) => ({
                tabPress: () => {
                  navigation.navigate("HomeStack", {
                    screen: "HomeMain",
                  });
                },
              })}
            />
            <Tab.Screen
              name="SettingsStack"
              component={SettingsStackScreen}
              options={{
                tabBarLabel: "Cài đặt",
                headerShown: false,
              }}
              listeners={({ navigation }) => ({
                tabPress: () => {
                  navigation.navigate("SettingsStack", {
                    screen: "SettingsMain",
                  });
                },
              })}
            />
            <Tab.Screen
              name="HistoryStack"
              component={HistoryStackScreen}
              options={{
                tabBarLabel: "Nhật ký",
                headerShown: false,
              }}
              listeners={({ navigation }) => ({
                tabPress: () => {
                  navigation.navigate("HistoryStack", {
                    screen: "HistoryMain",
                  });
                },
              })}
            />
            <Tab.Screen
              name="SocialStack"
              component={SocialStackScreen}
              options={{
                tabBarLabel: "Cộng đồng",
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "people" : "people-outline"}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
          {/* <LazyReminder /> */}
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
