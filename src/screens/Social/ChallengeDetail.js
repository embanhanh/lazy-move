import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES, TextStyles, FONTS } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ChallengeDetail = ({ route, navigation }) => {
  const { challenge } = route.params;
  const [isJoined, setIsJoined] = useState(false); // Mặc định chưa tham gia

  const participants = [
    {
      id: 1,
      name: "Minh Lười",
      avatar: require("../../../assets/imgs/avatar1.jpg"),
      progress: 4,
      status: "online",
    },
    {
      id: 2,
      name: "Hà Lười",
      avatar: require("../../../assets/imgs/avatar2.jpg"),
      progress: 2,
      status: "offline",
    },
    {
      id: 3,
      name: "Hà Lười",
      avatar: require("../../../assets/imgs/avatar2.jpg"),
      progress: 2,
      status: "offline",
    },
    {
      id: 4,
      name: "Hà Lười",
      avatar: require("../../../assets/imgs/avatar2.jpg"),
      progress: 2,
      status: "offline",
    },
    {
      id: 5,
      name: "Hà Lười",
      avatar: require("../../../assets/imgs/avatar2.jpg"),
      progress: 2,
      status: "offline",
    },
  ];

  const handleJoinChallenge = () => {
    setIsJoined(true);
    // Xử lý logic tham gia thử thách
  };

  const handleInviteFriends = () => {
    // Xử lý logic mời bạn bè
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Chi Tiết Thử Thách</Text>
          <Text style={styles.headerSubtitle}>Theo dõi tiến độ thử thách</Text>
        </View>
      </View>

      {/* Container cho phần nội dung có thể scroll */}
      <View style={styles.mainContainer}>
        {/* Phần thông tin thử thách - cố định */}
        <View style={styles.challengeInfo}>
          <View style={styles.challengeHeader}>
            <Text style={styles.title}>{challenge.title}</Text>
            <View style={styles.rewardBadge}>
              <Ionicons name="star" size={16} color={COLORS.secondary} />
              <Text style={styles.rewardText}>{challenge.reward} LP</Text>
            </View>
          </View>
          <Text style={styles.description}>{challenge.description}</Text>

          {/* Progress tổng */}
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Tiến độ nhóm</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(challenge.progress / challenge.goal) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {challenge.progress}/{challenge.goal}
              </Text>
            </View>
          </View>

          {/* Thời gian còn lại */}
          <View style={styles.timeContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color={COLORS.text.primary}
            />
            <Text style={styles.timeText}>Còn {challenge.timeLeft}</Text>
          </View>
        </View>

        {/* Phần danh sách người tham gia - có thể scroll */}
        <View style={styles.participantsContainer}>
          <Text style={styles.sectionTitle}>
            Người tham gia ({participants.length})
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.participantsList}
          >
            {participants.map((participant) => (
              <View key={participant.id} style={styles.participantCard}>
                <View style={styles.participantInfo}>
                  <Image source={participant.avatar} style={styles.avatar} />
                  <View style={styles.participantDetails}>
                    <Text style={styles.participantName}>
                      {participant.name}
                    </Text>
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${
                                (participant.progress / challenge.goal) * 100
                              }%`,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {participant.progress}/{challenge.goal}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        participant.status === "online" ? "#4CAF50" : "#757575",
                    },
                  ]}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Button tham gia/mời */}
      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.primary }]}
          onPress={isJoined ? handleInviteFriends : handleJoinChallenge}
        >
          <Ionicons
            name={isJoined ? "share-social" : "add-circle"}
            size={20}
            color={COLORS.text.primary}
          />
          <Text style={styles.buttonText}>
            {isJoined ? "Mời bạn bè" : "Tham gia ngay"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding.medium,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  backButton: {
    marginRight: SIZES.padding.medium,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: SIZES.text.header,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  container: {
    flex: 1,
    padding: SIZES.padding.large,
  },
  challengeInfo: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
    margin: SIZES.padding.large,
    marginBottom: SIZES.padding.medium,
    gap: SIZES.padding.small,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.padding.small,
  },
  title: {
    fontSize: SIZES.text.xLarge,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.text.primary,
    flex: 1,
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
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
  },
  description: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  progressSection: {
    marginBottom: SIZES.padding.medium,
  },
  progressTitle: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.medium,
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
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.small,
  },
  timeText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    opacity: 0.8,
  },
  participantsContainer: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
    marginHorizontal: SIZES.padding.large,
  },
  sectionTitle: {
    fontSize: SIZES.text.large,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  participantCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: `${COLORS.background}50`,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.padding.small,
  },
  participantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.medium,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  participantDetails: {
    flex: 1,
    gap: SIZES.padding.small,
  },
  participantName: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bottomButton: {
    padding: SIZES.padding.large,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.primary}20`,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    gap: SIZES.padding.small,
  },
  buttonText: {
    color: COLORS.text.primary,
    fontSize: SIZES.text.large,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    paddingBottom: 15,
  },
  participantsList: {
    paddingBottom: SIZES.padding.large,
  },
});

export default ChallengeDetail;
