// App.js
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
// Stacks cho từng tab
const HomeStack = createNativeStackNavigator();
const PracticeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
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
  </HomeStack.Navigator>
);

// Màn hình cho Profile Stack
const PracticeScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Bài tập</Text>
  </View>
);

// Stack Navigator cho Practice
const PracticeStackScreen = () => (
  <PracticeStack.Navigator>
    <PracticeStack.Screen
      name="PracticeMain"
      component={PracticeScreen}
      options={{ headerShown: false }}
    />
    <PracticeStack.Screen
      name="PracticeDetail"
      component={PracticeDetail}
      options={{ headerShown: false }}
    />
  </PracticeStack.Navigator>
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

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
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
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "HomeStack") {
                  iconName = "home";
                } else if (route.name === "PracticeStack") {
                  iconName = "list";
                } else if (route.name === "SettingsStack") {
                  iconName = "settings";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: COLORS.icon.active,
              tabBarInactiveTintColor: COLORS.icon.inactive,
              tabBarStyle: {
                height: 60,
                paddingBottom: 8,
                paddingTop: 8,
                backgroundColor: COLORS.primary,
              },
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
              name="PracticeStack"
              component={PracticeStackScreen}
              options={{
                tabBarLabel: "Bài tập",
                headerShown: false,
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();
                  // Reset the stack to initial route
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: "PracticeStack",
                        state: {
                          routes: [{ name: "PracticeMain" }],
                        },
                      },
                    ],
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
          </Tab.Navigator>
          <LazyReminder />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
