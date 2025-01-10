import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "../../constants/theme";

const TrainerCard = ({ trainer, onPress }) => {
  const renderButton = () => {
    if (trainer.owned) {
      if (trainer.isActive) {
        return (
          <View style={styles.checkIcon}>
            <Ionicons name="checkmark" size={16} color={COLORS.background} />
          </View>
        );
      }
      return (
        <TouchableOpacity style={styles.replaceButton}>
          <Text style={styles.replaceButtonText}>Thay Thế</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Mua</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity style={styles.trainerCard} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image source={trainer.avatar} style={styles.trainerAvatar} />
      </View>
      <View style={styles.trainerInfo}>
        <Text style={styles.trainerName}>{trainer.name}</Text>
        <Text style={styles.trainerPoints}>Lazy Point: {trainer.points}</Text>
      </View>
      {renderButton()}
    </TouchableOpacity>
  );
};

const Trainers = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("unowned");

  const trainers = [
    {
      id: 1,
      name: "Highlord Lion",
      points: "2,000",
      avatar: require("../../../assets/imgs/trainer6.png"),
      owned: true,
      isActive: true,
    },
    {
      id: 2,
      name: "Lithe Bunny",
      points: "2,000",
      avatar: require("../../../assets/imgs/trainer7.png"),
      owned: true,
      isActive: false,
    },
    {
      id: 3,
      name: "Mystic Owl",
      points: "2,000",
      avatar: require("../../../assets/imgs/trainer2.png"),
      owned: false,
      isActive: false,
    },
    {
      id: 4,
      name: "Wisdom Panda",
      points: "2,000",
      avatar: require("../../../assets/imgs/trainer5.png"),
      owned: false,
      isActive: false,
    },
    {
      id: 5,
      name: "Ghost",
      points: "2,000",
      avatar: require("../../../assets/imgs/trainer3.png"),
      owned: false,
      isActive: false,
    },
    {
      id: 6,
      name: "Tiger",
      points: "2,000",
      avatar: require("../../../assets/imgs/trainer4.png"),
      owned: false,
      isActive: false,
    },
    {
      id: 7,
      name: "Fat Bear",
      points: "2,000",
      avatar: require("../../../assets/imgs/trainer1.png"),
      owned: false,
      isActive: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back" size={24} color={COLORS.text.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Huấn Luyện Viên</Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "unowned" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("unowned")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "unowned" && styles.activeTabText,
            ]}
          >
            Chưa Sở Hữu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "owned" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("owned")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "owned" && styles.activeTabText,
            ]}
          >
            Đã Sở Hữu
          </Text>
        </TouchableOpacity>
      </View>

      {/* Trainer List */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {trainers
          .filter((trainer) =>
            activeTab === "owned" ? trainer.owned : !trainer.owned
          )
          .map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onPress={() => {}}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding.medium,
    paddingTop: 40,
  },
  backButton: {
    marginRight: SIZES.padding.small,
  },
  headerTitle: {
    fontSize: SIZES.text.header,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding.large,
    marginBottom: SIZES.padding.medium,
  },
  tabButton: {
    flex: 1,
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
    borderRadius: SIZES.radius.large,
    marginHorizontal: 4,
    backgroundColor: COLORS.card,
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.text.primary,
    textAlign: "center",
  },
  activeTabText: {
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
  },
  scrollContainer: {
    flex: 1,
    padding: SIZES.padding.large,
  },
  trainerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.medium,
    marginBottom: SIZES.padding.medium,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.padding.medium,
  },
  trainerAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  trainerPoints: {
    fontSize: SIZES.text.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  buyButton: {
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius.small,
    minWidth: 100,
    alignItems: "center",
  },
  replaceButton: {
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius.small,
    minWidth: 100,
    alignItems: "center",
  },
  checkIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
  },
  buyButtonText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.bold,
    color: "#333",
  },
  replaceButtonText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.bold,
    color: "#333",
  },
});

export default Trainers;
