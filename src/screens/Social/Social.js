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
import { SafeAreaView } from "react-native-safe-area-context";

const Social = ({ navigation }) => {
  // Data mẫu cho bạn bè
  const friends = [
    {
      id: 1,
      name: "Minh Lười",
      streak: 7,
      points: 1500,
      avatar: require("../../../assets/imgs/avatar1.jpg"),
      status: "online", // online, offline
    },
    {
      id: 2,
      name: "Hà Lười",
      streak: 5,
      points: 1200,
      avatar: require("../../../assets/imgs/avatar2.jpg"),
      status: "offline",
    },
  ];

  // Data mẫu cho thử thách
  const challenges = [
    {
      id: 1,
      title: "Tuần Siêng Năng",
      description: "Cả nhóm hoàn thành 10 bài tập trong tuần",
      progress: 6,
      goal: 10,
      reward: 500,
      participants: 4,
      timeLeft: "5 ngày",
    },
    {
      id: 2,
      title: "Thử Thách Lười",
      description: "Mỗi người tập 1 bài/ngày",
      progress: 3,
      goal: 7,
      reward: 300,
      participants: 3,
      timeLeft: "2 ngày",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header cố định */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Cộng Đồng Lười</Text>
        <Text style={styles.subtitle}>Lười Có Tổ Chức Hơn</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Thử thách đang diễn ra */}
        <View style={styles.challengeContainer}>
          <Text style={styles.sectionTitle}>Thử Thách Đang Diễn Ra</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengeScroll}
          >
            {challenges.map((challenge) => (
              <TouchableOpacity
                key={challenge.id}
                style={styles.challengeCard}
                onPress={() =>
                  navigation.navigate("ChallengeDetail", { challenge })
                }
              >
                <View style={styles.challengeHeader}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <View style={styles.rewardBadge}>
                    <Ionicons name="star" size={16} color={COLORS.secondary} />
                    <Text style={styles.rewardText}>{challenge.reward} LP</Text>
                  </View>
                </View>

                <Text style={styles.challengeDescription}>
                  {challenge.description}
                </Text>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${
                            (challenge.progress / challenge.goal) * 100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {challenge.progress}/{challenge.goal}
                  </Text>
                </View>

                <View style={styles.challengeFooter}>
                  <View style={styles.footerItem}>
                    <Ionicons
                      name="people-outline"
                      size={16}
                      color={COLORS.text.primary}
                    />
                    <Text style={styles.footerText}>
                      {challenge.participants} người
                    </Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={COLORS.text.primary}
                    />
                    <Text style={styles.footerText}>
                      Còn {challenge.timeLeft}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bạn bè đang hoạt động */}
        <View style={styles.friendsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bạn Bè Lười</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="person-add" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {friends.map((friend) => (
            <TouchableOpacity key={friend.id} style={styles.friendCard}>
              <View style={styles.friendInfo}>
                <Image source={friend.avatar} style={styles.avatar} />
                <View style={styles.friendDetails}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <View style={styles.friendStats}>
                    <View style={styles.statItem}>
                      <Ionicons
                        name="flame"
                        size={16}
                        color={COLORS.secondary}
                      />
                      <Text style={styles.statText}>{friend.streak} ngày</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Ionicons
                        name="star"
                        size={16}
                        color={COLORS.secondary}
                      />
                      <Text style={styles.statText}>{friend.points} LP</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      friend.status === "online" ? "#4CAF50" : "#757575",
                  },
                ]}
              />
            </TouchableOpacity>
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
    paddingVertical: 10,
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding.small,
  },
  sectionTitle: {
    fontSize: SIZES.text.large,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  addButton: {
    padding: SIZES.padding.small,
  },
  challengeContainer: {},
  challengeCard: {
    width: 300,
    marginRight: SIZES.padding.medium,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
    marginBottom: SIZES.padding.medium,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding.small,
  },
  challengeTitle: {
    fontSize: SIZES.text.large,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  rewardBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${COLORS.secondary}20`,
    paddingHorizontal: SIZES.padding.small,
    paddingVertical: 4,
    borderRadius: SIZES.radius.small,
    gap: 4,
  },
  rewardText: {
    color: COLORS.secondary,
    fontSize: SIZES.text.small,
    fontWeight: "bold",
  },
  challengeDescription: {
    fontSize: SIZES.text.medium,
    color: COLORS.text.primary,
    opacity: 0.8,
    marginBottom: SIZES.padding.medium,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.medium,
    marginBottom: SIZES.padding.medium,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: `${COLORS.secondary}20`,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.secondary,
  },
  progressText: {
    fontSize: SIZES.text.medium,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  challengeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: SIZES.text.small,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  friendsContainer: {
    marginBottom: SIZES.padding.large,
  },
  friendCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.medium,
    marginBottom: SIZES.padding.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.medium,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendDetails: {
    gap: 4,
  },
  friendName: {
    fontSize: SIZES.text.medium,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  friendStats: {
    flexDirection: "row",
    gap: SIZES.padding.medium,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: SIZES.text.small,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  challengeScroll: {
    padding: SIZES.padding.small,
  },
});

export default Social;
