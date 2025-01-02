import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import StreakFire from "../../components/StreakFire/StreakFire";

const History = () => {
  const streak = 5; // Lazy Points hiện tại
  const weekProgress = [
    { day: "T2", completed: true },
    { day: "T3", completed: true },
    { day: "T4", completed: true },
    { day: "T5", completed: true },
    { day: "T6", completed: true },
    { day: "T7", completed: false },
    { day: "CN", completed: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Nhật Ký Rèn Luyện</Text>
        <Text style={styles.subtitle}>Theo Dõi Tiến Bộ Từng Bước Mỗi Ngày</Text>
      </View>

      {/* Streak Section */}
      <View style={styles.streakContainer}>
        <View style={styles.streakContent}>
          <StreakFire streak={streak} />
        </View>
      </View>

      {/* Week Progress */}
      <View style={styles.weekContainer}>
        <Text style={styles.weekTitle}>Tuần này</Text>
        <View style={styles.weekProgress}>
          {weekProgress.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day.day}</Text>
              <View
                style={[
                  styles.dayProgress,
                  {
                    backgroundColor: day.completed
                      ? COLORS.secondary
                      : COLORS.primary,
                  },
                ]}
              >
                <Ionicons
                  name={day.completed ? "flame" : "snow"}
                  size={20}
                  color={day.completed ? COLORS.background : "#fff"}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding.large,
    paddingTop: 40,
  },
  headerSection: {
    marginBottom: SIZES.padding.large,
  },
  title: {
    fontSize: SIZES.text.header,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.text.medium,
    color: COLORS.text.primary,
    marginTop: 4,
  },
  streakContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.small,
    marginBottom: SIZES.padding.large,
    alignItems: "center",
  },
  streakContent: {
    alignItems: "center",
    gap: SIZES.padding.medium,
  },
  weekContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
    marginBottom: SIZES.padding.large,
  },
  weekTitle: {
    fontSize: SIZES.text.large,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  weekProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayContainer: {
    alignItems: "center",
    gap: SIZES.padding.small,
  },
  dayText: {
    fontSize: SIZES.text.small,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  dayProgress: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default History;
