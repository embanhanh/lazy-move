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
// Stacks cho từng tab
const HomeStack = createNativeStackNavigator();
const PracticeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
// Stack Navigator cho Home
const HomeStackScreen = () => (
  <HomeStack.Navigator>
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
    <Text>Hồ sơ</Text>
  </View>
);

const PracticeDetailScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Chi tiết hồ sơ</Text>
  </View>
);

// Stack Navigator cho Practice
const PracticeStackScreen = () => (
  <PracticeStack.Navigator>
    <PracticeStack.Screen
      name="PracticeMain"
      component={PracticeScreen}
      options={{ title: "Hồ sơ", headerShown: false }}
    />
    <PracticeStack.Screen
      name="PracticeDetail"
      component={PracticeDetailScreen}
      options={{ title: "Chi tiết hồ sơ", headerShown: false }}
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
    <>
      <StatusBar
        hidden={true}
        translucent={true}
        backgroundColor="transparent"
      />
      <NavigationContainer>
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
          />
          <Tab.Screen
            name="PracticeStack"
            component={PracticeStackScreen}
            options={{
              tabBarLabel: "Bài tập",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="SettingsStack"
            component={SettingsStackScreen}
            options={{
              tabBarLabel: "Cài đặt",
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
