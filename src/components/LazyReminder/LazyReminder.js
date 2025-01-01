import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import exercise1 from "../../../assets/imgs/exercise1.png";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const LazyReminder = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const scaleAnim = new Animated.Value(0);

  const reminders = [
    {
      title: "Mắt mỏi rồi đó",
      message: "Nhắm mắt lại 20 giây thôi, đừng lười nha 👀",
      exercise: "Thư giãn mắt",
      duration: "20 giây",
      points: "100 Lazy Points",
      image: exercise1,
      description:
        "Bài tập giúp thư giãn mắt, giảm căng thẳng và tăng tuần hoàn máu. Thực hiện đều đặn mỗi ngày sẽ giúp giảm đau mỏi mắt, tăng cường tuần hoàn máu và giảm stress hiệu quả. Bài tập này đặc biệt phù hợp cho người làm việc văn phòng, thường xuyên ngồi một chỗ trong thời gian dài.",
    },
    {
      title: "Ngồi lâu quá rồi",
      message: "Xoay vai một chút cho đỡ mỏi nè 🦾",
      exercise: "Xoay vai",
      duration: "2 Phút",
      points: "200 Lazy Points",
      image: exercise1,
      description:
        "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng. Thực hiện đều đặn mỗi ngày sẽ giúp giảm đau mỏi vai gáy, tăng cường tuần hoàn máu và giảm stress hiệu quả. Bài tập này đặc biệt phù hợp cho người làm việc văn phòng, thường xuyên ngồi một chỗ trong thời gian dài.",
    },
    {
      title: "Cổ tay cứng quá",
      message: "Xoay cổ tay vài cái cho máu chạy đều 🤚",
      exercise: "Xoay cổ tay",
      duration: "2 Phút",
      points: "200 Lazy Points",
      image: exercise1,
      description:
        "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng. Thực hiện đều đặn mỗi ngày sẽ giúp giảm đau mỏi vai gáy, tăng cường tuần hoàn máu và giảm stress hiệu quả. Bài tập này đặc biệt phù hợp cho người làm việc văn phòng, thường xuyên ngồi một chỗ trong thời gian dài.",
    },
  ];

  const motivationalPhrases = [
    "Chỉ cần 2 phút thôi, dễ mà! 🌟",
    "Lười cũng phải lười có kỹ thuật chứ! 😎",
    "Nghỉ ngơi đúng cách để lười hiệu quả hơn 💪",
    "Vận động tí cho máu chạy đều nè! 🎯",
  ];

  useEffect(() => {
    // Hiển thị reminder lần đầu sau 5s
    const initialTimer = setTimeout(() => {
      showReminder();
    }, 5000);

    // Sau đó cứ mỗi 5s sẽ hiện lại
    const intervalTimer = setInterval(() => {
      showReminder();
    }, 5000);

    // Cleanup timers
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const showReminder = () => {
    // Reset animation value
    scaleAnim.setValue(0);

    const randomReminder =
      reminders[Math.floor(Math.random() * reminders.length)];
    const randomPhrase =
      motivationalPhrases[
        Math.floor(Math.random() * motivationalPhrases.length)
      ];
    setCurrentReminder({
      ...randomReminder,
      motivationalPhrase: randomPhrase,
    });
    setVisible(true);

    Animated.sequence([
      // Hiện overlay trước
      Animated.timing(scaleAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      // Sau đó scale reminder
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Tự động ẩn sau 3s
    setTimeout(hideReminder, 4000);
  };

  const hideReminder = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const handleExercisePress = () => {
    hideReminder();
    // Điều hướng đến bài tập tương ứng
    navigation.navigate("PracticeStack", {
      screen: "PracticeDetail",
      params: {
        title: currentReminder.exercise,
        description: currentReminder.message,
        duration: currentReminder.duration,
        points: currentReminder.points,
        image: currentReminder.image,
      },
    });
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay]}>
      <Animated.View style={[styles.container]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="fitness" size={28} color={COLORS.secondary} />
            </View>
            <Text style={styles.title}>{currentReminder.title}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{currentReminder.message}</Text>
            <Text style={styles.motivationalPhrase}>
              {currentReminder.motivationalPhrase}
            </Text>
          </View>
          <View style={styles.rewardContainer}>
            <Ionicons name="star" size={20} color={COLORS.secondary} />
            <Text style={styles.rewardText}>
              Hoàn thành ngay + {currentReminder.points}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.laterButton]}
              onPress={hideReminder}
            >
              <Ionicons
                name="time-outline"
                size={20}
                color={COLORS.text.primary}
              />
              <Text style={styles.buttonTextLater}>Để lúc khác</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.exerciseButton]}
              onPress={handleExercisePress}
            >
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={COLORS.text.primary}
              />
              <Text style={styles.buttonTextExercise}>Làm luôn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1000,
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: width - 40,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
    elevation: 1001,
    zIndex: 1001,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    gap: SIZES.padding.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.small,
  },
  title: {
    fontSize: SIZES.text.large,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  messageContainer: {
    backgroundColor: COLORS.background,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    gap: SIZES.padding.small,
  },
  message: {
    fontSize: SIZES.text.large,
    color: COLORS.text.primary,
    lineHeight: 24,
    textAlign: "center",
  },
  motivationalPhrase: {
    fontSize: SIZES.text.medium,
    color: COLORS.secondary,
    fontStyle: "italic",
    textAlign: "center",
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.padding.small,
    backgroundColor: `${COLORS.secondary}20`,
    padding: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
  },
  rewardText: {
    fontSize: SIZES.text.medium,
    color: COLORS.secondary,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: SIZES.padding.medium,
    marginTop: SIZES.padding.small,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.padding.small,
    paddingVertical: SIZES.padding.medium,
    paddingHorizontal: SIZES.padding.large,
    borderRadius: SIZES.radius.medium,
    flex: 1,
  },
  laterButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  exerciseButton: {
    backgroundColor: COLORS.primary,
  },
  buttonTextLater: {
    color: COLORS.text.primary,
    fontSize: SIZES.text.medium,
  },
  buttonTextExercise: {
    color: COLORS.text.primary,
    fontSize: SIZES.text.medium,
    fontWeight: "bold",
  },
  iconContainer: {
    backgroundColor: `${COLORS.secondary}20`,
    padding: SIZES.padding.small,
    borderRadius: SIZES.radius.medium,
  },
});

export default LazyReminder;
