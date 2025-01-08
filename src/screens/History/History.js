import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES, TextStyles } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import StreakFire from "../../components/StreakFire/StreakFire";
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const streak = 5; // Lazy Points hiện tại
  const weekProgress = [
    { day: "T2", status: "completed" },
    { day: "T3", status: "completed" },
    { day: "T4", status: "completed" },
    { day: "T5", status: "missed" },
    { day: "T6", status: "upcoming" },
    { day: "T7", status: "upcoming" },
    { day: "CN", status: "upcoming" },
  ];

  const getIconForStatus = (status) => {
    switch (status) {
      case "completed":
        return <Ionicons name="flame" size={20} color={COLORS.background} />;
      case "missed":
        return <Ionicons name="snow" size={20} color="#fff" />;
      case "upcoming":
        return null;
      default:
        return null;
    }
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "completed":
        return COLORS.secondary;
      case "missed":
        return COLORS.primary;
      case "upcoming":
        return COLORS.card;
      default:
        return COLORS.card;
    }
  };

  // Thêm data mẫu cho hoạt động
  const activities = [
    {
      date: "Hôm nay",
      exercises: [
        {
          title: "Thư giãn mắt",
          duration: "2 phút",
          points: 100,
          status: "completed", // hoàn thành
        },
        {
          title: "Xoay cổ tay",
          duration: "1 phút",
          points: 50,
          status: "missed", // bỏ lỡ/chưa làm
        },
      ],
    },
    {
      date: "Hôm qua",
      exercises: [
        {
          title: "Thư giãn mắt",
          duration: "2 phút",
          points: 100,
          status: "completed",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header cố định */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Nhật Ký Rèn Luyện</Text>
        <Text style={styles.subtitle}>Theo Dõi Tiến Bộ Từng Bước Mỗi Ngày</Text>
      </View>

      {/* Content có thể scroll */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
                      backgroundColor: getBackgroundColor(day.status),
                    },
                  ]}
                >
                  {getIconForStatus(day.status)}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Thống kê tổng quát */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Lazy Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Bài tập</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Phút</Text>
          </View>
        </View>

        {/* Nhật ký hoạt động */}
        <View style={[styles.activityContainer, styles.lastContainer]}>
          <Text style={styles.activityTitle}>Hoạt động gần đây</Text>

          {activities.map((day, index) => (
            <View key={index} style={styles.dayActivities}>
              <Text style={styles.dateLabel}>{day.date}</Text>

              {day.exercises.map((exercise, exIndex) => (
                <View key={exIndex} style={styles.activityCard}>
                  <View style={styles.activityLeft}>
                    <View
                      style={[
                        styles.activityStatus,
                        {
                          backgroundColor:
                            exercise.status === "completed"
                              ? COLORS.secondary
                              : `${COLORS.primary}50`,
                        },
                      ]}
                    >
                      <Ionicons
                        name={
                          exercise.status === "completed"
                            ? "checkmark"
                            : "timer-outline"
                        }
                        size={16}
                        color={
                          exercise.status === "completed"
                            ? COLORS.background
                            : COLORS.primary
                        }
                      />
                    </View>
                    <Text style={styles.activityName}>{exercise.title}</Text>
                    {exercise.status === "missed" && (
                      <Text style={styles.missedText}>Để lúc khác</Text>
                    )}
                  </View>

                  <View style={styles.activityRight}>
                    <View style={styles.activityDetail}>
                      <Ionicons
                        name="time-outline"
                        size={16}
                        color={COLORS.text.primary}
                      />
                      <Text style={styles.detailText}>{exercise.duration}</Text>
                    </View>
                    <View style={styles.activityDetail}>
                      <Ionicons
                        name="star"
                        size={16}
                        color={COLORS.secondary}
                      />
                      <Text style={styles.detailText}>
                        {exercise.points} LP
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    backgroundColor: COLORS.background,
    padding: SIZES.padding.large,
    paddingVertical: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding.large,
  },
  title: {
    ...TextStyles.header,
    color: COLORS.primary,
  },
  subtitle: {
    ...TextStyles.description,
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
    ...TextStyles.large,
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
    ...TextStyles.small,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  dayProgress: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: `${COLORS.secondary}30`,
  },
  statsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.padding.large,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    ...TextStyles.emphasis,
    color: COLORS.secondary,
  },
  statLabel: {
    ...TextStyles.small,
    color: COLORS.text.primary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: `${COLORS.text.primary}20`,
  },
  activityContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
  },
  activityTitle: {
    ...TextStyles.large,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  dayActivities: {
    marginBottom: SIZES.padding.large,
  },
  dateLabel: {
    ...TextStyles.medium,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
    opacity: 0.8,
  },
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: `${COLORS.background}50`,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.padding.small,
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.small,
  },
  activityStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  activityName: {
    ...TextStyles.medium,
    color: COLORS.text.primary,
  },
  activityRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  activityDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    ...TextStyles.small,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  missedText: {
    ...TextStyles.small,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  lastContainer: {
    marginBottom: 80, // Thêm margin bottom cho container cuối
  },
});

export default History;
