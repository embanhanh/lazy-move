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

const MenuItem = ({ icon, title, onPress, IconComponent }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <IconComponent name={icon} size={24} color={COLORS.text.primary} />
    </View>
    <Text style={styles.menuTitle}>{title}</Text>
    <Ionicons name="caret-forward" size={20} color={COLORS.text.secondary} />
  </TouchableOpacity>
);

const Account = ({ navigation }) => {
  const userInfo = {
    name: "Thông Joker",
    weight: "75 Kg",
    age: "28",
    height: "1.65 M",
    avatar: require("../../../assets/imgs/avatar1.jpg"),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Tài Khoản</Text>
        <Text style={styles.subtitle}>Thông Tin Cá Nhân</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={userInfo.avatar} style={styles.avatar} />
            <View style={styles.onlineIndicator} />
          </View>
          <Text style={styles.userName}>{userInfo.name}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Nặng</Text>
              <Text style={styles.statValue}>{userInfo.weight}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Tuổi</Text>
              <Text style={styles.statValue}>{userInfo.age}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cao</Text>
              <Text style={styles.statValue}>{userInfo.height}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem
            IconComponent={Ionicons}
            icon="person"
            title="Thông Tin Cá Nhân"
            onPress={() => {}}
          />
          <MenuItem
            IconComponent={Ionicons}
            icon="paw"
            title="Động Vật Lười Biếng"
            onPress={() => navigation.navigate("LazyPets")}
          />
          <MenuItem
            IconComponent={MaterialCommunityIcons}
            icon="whistle"
            title="Huấn Luyện Viên"
            onPress={() => {}}
          />
          <MenuItem
            IconComponent={Ionicons}
            icon="moon"
            title="Chế Độ Ngủ"
            onPress={() => {}}
          />
          <MenuItem
            IconComponent={Ionicons}
            icon="settings"
            title="Cài Đặt"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    backgroundColor: COLORS.background,
    padding: SIZES.padding.large,
    paddingVertical: 10,
    paddingTop: 40,
  },
  title: {
    fontSize: SIZES.text.header,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginTop: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    padding: SIZES.padding.large,
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.padding.large,
    borderRadius: SIZES.radius.large,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SIZES.padding.small,
  },
  onlineIndicator: {
    position: "absolute",
    right: 0,
    bottom: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: COLORS.card,
  },
  userName: {
    fontSize: SIZES.text.xLarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.medium,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: SIZES.padding.medium,
    marginTop: SIZES.padding.medium,
  },
  statItem: {
    backgroundColor: COLORS.background,
    paddingVertical: SIZES.padding.small,
    paddingHorizontal: SIZES.padding.medium,
    borderRadius: SIZES.radius.small,
    alignItems: "center",
    minWidth: 80,
  },
  statLabel: {
    fontSize: SIZES.text.small,
    fontFamily: FONTS.system,
    color: COLORS.text.secondary,
  },
  statValue: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
  },
  menuContainer: {
    padding: SIZES.padding.large,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding.medium,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.padding.small,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.padding.medium,
  },
  menuTitle: {
    flex: 1,
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
});

export default Account;
