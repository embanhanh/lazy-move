import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS, SIZES, TextStyles } from "../../constants/theme";

const CircleProgress = ({ seconds = 3, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      rotateAnim.setValue(0);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      `${360 * (timeLeft / seconds)}deg`,
      `${360 * ((timeLeft - 1) / seconds)}deg`,
    ],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {/* Viền tĩnh */}
        <View style={styles.staticBorder} />

        {/* Viền đếm ngược - phần trên */}
        <Animated.View
          style={[
            styles.progressBorder,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <View style={styles.progressHalf} />
        </Animated.View>

        {/* Số đếm ngược */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{timeLeft}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  circle: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  staticBorder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: `${COLORS.secondary}30`,
  },
  progressBorder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 18,
    overflow: "hidden",
  },
  progressHalf: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  textContainer: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...TextStyles.emphasis,
    color: COLORS.secondary,
  },
});

export default CircleProgress;
