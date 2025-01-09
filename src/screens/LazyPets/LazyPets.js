import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "../../constants/theme";

const PetStatus = {
  RELEASED: "RELEASED", // Đã giải phóng
  IN_PROGRESS: "IN_PROGRESS", // Đang giải phóng
  LOCKED: "LOCKED", // Chưa mở khóa
};

const PetCard = ({ pet }) => {
  const getStatusColor = () => {
    switch (pet.status) {
      case PetStatus.RELEASED:
        return COLORS.success;
      case PetStatus.IN_PROGRESS:
        return COLORS.primary;
      default:
        return COLORS.text.secondary;
    }
  };

  const getStatusIcon = () => {
    switch (pet.status) {
      case PetStatus.RELEASED:
        return (
          <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
        );
      case PetStatus.IN_PROGRESS:
        return (
          <MaterialCommunityIcons
            name="progress-check"
            size={20}
            color={COLORS.primary}
          />
        );
      case PetStatus.LOCKED:
        return (
          <Ionicons name="lock-closed" size={20} color={COLORS.text.primary} />
        );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.petCard,
        pet.status === PetStatus.LOCKED && styles.petCardLocked,
      ]}
    >
      <Image source={pet.image} style={styles.petImage} />
      <View style={styles.petInfo}>
        <View style={styles.nameRow}>
          <Text
            style={[
              styles.petName,
              //   pet.status === PetStatus.LOCKED && styles.petNameLocked,
            ]}
          >
            {`${pet.id}. ${pet.name}`}
          </Text>
          <View style={styles.statusBadge}>{getStatusIcon()}</View>
        </View>
        <Text
          style={[
            styles.pointsText,
            pet.status === PetStatus.LOCKED && styles.pointsTextLocked,
          ]}
        >
          Lazy Point: {pet.points}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const LazyPets = ({ navigation }) => {
  const currentPet = {
    name: "Sully Sullivan",
    image: require("../../../assets/imgs/monster1.png"),
    points: 700,
    maxPoints: 4000,
  };

  const pets = [
    {
      id: 1,
      name: "Randall Boggs",
      points: "2,000",
      image: require("../../../assets/imgs/monster2.png"),
      status: PetStatus.RELEASED,
    },
    {
      id: 2,
      name: "Sully Sullivan",
      points: "4,000",
      image: require("../../../assets/imgs/monster1.png"),
      status: PetStatus.IN_PROGRESS,
    },
    {
      id: 3,
      name: "Mike Wazowski",
      points: "6,000",
      image: require("../../../assets/imgs/monster3.png"),
      status: PetStatus.LOCKED,
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
        <Text style={styles.headerTitle}>Động Vật Lười Biếng</Text>
      </View>

      {/* Current Pet Card */}
      <View style={styles.currentPetCard}>
        <View style={styles.petInfoContainer}>
          <View style={styles.petImageContainer}>
            <View style={styles.circleBackground} />
            <Image source={currentPet.image} style={styles.currentPetImage} />
          </View>
          <View style={styles.petDetails}>
            <Text style={styles.currentPetName}>{currentPet.name}</Text>
            <Text style={styles.pointsLabel}>
              Lazy Point còn lại: {currentPet.maxPoints - currentPet.points}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressGlow} />
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      (currentPet.points / currentPet.maxPoints) * 100
                    }%`,
                  },
                ]}
              />
              <View style={styles.progressIcon}>
                <Image
                  source={require("../../../assets/imgs/monster1.png")}
                  style={styles.smallPetIcon}
                />
              </View>
            </View>
          </View>
          <View style={styles.pointsRange}>
            <Text style={styles.rangeText}>{currentPet.points} Điểm</Text>
            <Text style={styles.rangeText}>{currentPet.maxPoints} Điểm</Text>
          </View>
        </View>
      </View>

      {/* Pet List */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Lịch Sử Giải Phóng (1/64)</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </ScrollView>
      </View>
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
  currentPetCard: {
    padding: SIZES.padding.large,
  },
  petInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.padding.large,
  },
  petImageContainer: {
    position: "relative",
    width: 120,
    height: 120,
  },
  circleBackground: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.card,
  },
  currentPetImage: {
    width: 120,
    height: 120,
    position: "absolute",
  },
  petDetails: {
    flex: 1,
    marginLeft: SIZES.padding.large,
  },
  currentPetName: {
    fontSize: SIZES.text.xLarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
  },
  pointsLabel: {
    fontSize: SIZES.text.large,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
  },
  progressContainer: {
    width: "100%",
  },
  progressBarContainer: {
    padding: 4,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: `${COLORS.secondary}20`,
    borderRadius: 4,
    position: "relative",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    borderColor: `${COLORS.secondary}40`,
    borderWidth: 1,
  },
  progressIcon: {
    position: "absolute",
    right: -12,
    top: -16,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    borderColor: `${COLORS.secondary}40`,
  },
  progressGlow: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 6,
    backgroundColor: `${COLORS.secondary}10`,
  },
  smallPetIcon: {
    width: 30,
    height: 30,
  },
  pointsRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: SIZES.padding.small,
  },
  rangeText: {
    fontSize: SIZES.text.small,
    fontFamily: FONTS.regular,
    color: "#888",
    marginRight: SIZES.padding.xLarge,
  },
  listContainer: {
    flex: 1,
    padding: SIZES.padding.large,
  },
  listTitle: {
    fontSize: SIZES.text.large,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  petCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.medium,
    marginBottom: SIZES.padding.small,
    alignItems: "center",
  },
  petCardLocked: {
    backgroundColor: `${COLORS.card}80`,
  },
  petImage: {
    width: 60,
    height: 60,
    marginRight: SIZES.padding.medium,
  },
  petInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  petName: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  petNameLocked: {
    color: COLORS.text.secondary,
  },
  statusBadge: {
    marginLeft: SIZES.padding.small,
  },
  pointsText: {
    fontSize: SIZES.text.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
  },
  pointsTextLocked: {
    color: `${COLORS.text.secondary}80`,
  },
});

export default LazyPets;
