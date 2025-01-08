import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, TextStyles, FONTS } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StreakFire = ({ streak }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fireContainer}>
        <MaterialCommunityIcons
          name="fire"
          size={165}
          color={COLORS.secondary}
          style={{ position: "absolute", right: 10 }}
        />
        <View style={styles.streakContainer}>
          <View
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              backgroundColor: COLORS.secondary,
              top: -10,
            }}
          ></View>
          <View style={styles.circleBackground}>
            <Text style={styles.streakNumber}>{streak}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.streakText}>Ngày streak!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  fireContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  streakContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 7,
    left: 46,
  },
  circleBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  streakNumber: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    marginBottom: -4,
  },
  streakText: {
    fontSize: 20,
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
  },
});

export default StreakFire;
