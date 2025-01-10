import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import exercise1 from "../../../assets/imgs/exercise1.png";
import exercise2 from "../../../assets/imgs/exercise2.png";
import exercise3 from "../../../assets/imgs/exercise3.png";
import { styles } from "./styles";
import { COLORS } from "../../constants/theme";
import AnimatedCharacter from "../../components/AnimatedCharacter/AnimatedCharacter";
import LazyReminder from "../../components/LazyReminder/LazyReminder";

const Home = ({ navigation }) => {
  const [showReminder, setShowReminder] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [subTitle, setSubTitle] = useState("Hành Trình Lười Biến Mất");
  const favoriteAnimations = useRef({}).current;
  const [contentType, setContentType] = useState("exercise");
  const [exerciseFavorites, setExerciseFavorites] = useState(new Set());
  const [foodFavorites, setFoodFavorites] = useState(new Set());

  const exercises = [
    {
      id: 1,
      title: "Xoay Vai Thư Giãn",
      duration: "2 Phút",
      points: "200 Lazy Points",
      image: exercise3,
      isFavorite: true,
      description:
        "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng. Thực hiện đều đặn mỗi ngày sẽ giúp giảm đau mỏi vai gáy, tăng cường tuần hoàn máu và giảm stress hiệu quả. Bài tập này đặc biệt phù hợp cho người làm việc văn phòng, thường xuyên ngồi một chỗ trong thời gian dài.",
    },
    {
      id: 2,
      title: "Xoay Cổ Tay",
      duration: "1 Phút",
      points: "100 Lazy Points",
      image: exercise1,
      isFavorite: true,
      description: "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng",
    },
    {
      id: 3,
      title: "Gập Người",
      duration: "2 Phút",
      points: "300 Lazy Points",
      image: exercise2,
      isFavorite: true,
      description: "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng",
    },
    {
      id: 4,
      title: "Vươn Vai",
      duration: "2 Phút",
      points: "300 Lazy Points",
      image: exercise3,
      isFavorite: true,
      description: "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng",
    },
  ];

  const foods = [
    {
      id: 1,
      title: "Bánh Mì Đen Bơ Trứng",
      duration: "6 Phút",
      points: "310 Calories",
      image: require("../../../assets/imgs/food1.png"),
      type: "food",
      ingredients: [
        "1 Lát Bánh Mì Đen",
        "¼ Quả Bơ",
        "1 Quả Trứng Gà",
        "Dầu Oliu",
        "Hạt Tiêu",
      ],
      steps: [
        "Óp trứng vào dầu oliu",
        "Thái bơ thành lát hoặc nghiền nát",
        "Cho bơ và trứng lên bánh mì, thêm hạt tiêu là xong",
      ],
    },
    {
      id: 2,
      title: "Bánh Chuối Yến Mạch",
      duration: "12 Phút",
      points: "340 Calories",
      image: require("../../../assets/imgs/food2.png"),
      type: "food",
      ingredients: [
        "1 Chuối",
        "100g Yến Mạch",
        "100g Sữa Tươi",
        "100g Sữa Chua",
        "100g Mật Ong",
      ],
      steps: [
        "Nghiền chuối",
        "Trộn yến mạch với sữa tươi",
        "Thêm sữa chua và mật ong",
      ],
    },
    {
      id: 3,
      title: "Sữa Chua Hy Lạp",
      duration: "5 Phút",
      points: "240 Calories",
      image: require("../../../assets/imgs/food3.png"),
      type: "food",
      ingredients: ["100g Sữa Chua", "100g Hạt Chia", "100g Mật Ong"],
      steps: ["Trộn sữa chua với hạt chia", "Thêm mật ong là xong"],
    },
  ];

  const handleExercisePress = (item) => {
    navigation.navigate("PracticeDetail", {
      ...item,
      previousScreen: "Home",
      type: contentType,
    });
  };

  const toggleFavorite = (id, type) => {
    const favorites = type === "exercise" ? exerciseFavorites : foodFavorites;
    const setFavorites =
      type === "exercise" ? setExerciseFavorites : setFoodFavorites;

    if (!favoriteAnimations[id]) {
      favoriteAnimations[id] = new Animated.Value(1);
    }

    Animated.sequence([
      Animated.timing(favoriteAnimations[id], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(favoriteAnimations[id], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(favoriteAnimations[id], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleSpeakClick = (setShowInteractionModal) => {
    setContentType((prev) => (prev === "exercise" ? "food" : "exercise"));
    setSubTitle(
      contentType === "exercise"
        ? "Hành Trình Dinh Dưỡng Hoàn Hảo"
        : "Hành Trình Lười Biến Mất"
    );
    setShowInteractionModal(false);
  };

  return (
    <View style={styles.container}>
      {showReminder && <LazyReminder onClose={() => setShowReminder(false)} />}
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Chào, Thông</Text>
          <Text style={styles.subGreeting}>
            Bắt đầu nhẹ nhàng để không mệt!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setShowReminder((prev) => !prev)}
        >
          <Ionicons name="notifications" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Character Section */}
      <View style={styles.characterContainer}>
        <AnimatedCharacter handleSpeakClick={handleSpeakClick} />
      </View>

      {/* Exercise/Dish List Section */}
      <View style={styles.exerciseListContainer}>
        <Text style={styles.sectionTitle}>{subTitle}</Text>
        <Text style={styles.sectionSubtitle}>
          Khám Phá Thói Quen Vận Động Dễ Dàng
        </Text>

        <ScrollView style={styles.exerciseList}>
          {(contentType === "exercise" ? exercises : foods).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.exerciseCard}
              onPress={() => handleExercisePress(item)}
            >
              <Image source={item.image} style={styles.exerciseImage} />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{item.title}</Text>
                <View style={styles.exerciseDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons
                      name={
                        contentType === "exercise"
                          ? "timer-outline"
                          : "time-outline"
                      }
                      size={16}
                      color="#888"
                    />
                    <Text style={styles.exerciseDuration}>{item.duration}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    {contentType === "exercise" ? (
                      <FontAwesome5 name="running" size={16} color="#888" />
                    ) : (
                      <MaterialCommunityIcons
                        name="fire"
                        size={16}
                        color="#888"
                      />
                    )}
                    <Text style={styles.exercisePoints}>{item.points}</Text>
                  </View>
                </View>
              </View>
              <Animated.View
                style={[
                  styles.favoriteButton,
                  {
                    transform: [
                      {
                        scale: favoriteAnimations[item.id] || 1,
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id, contentType)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={
                      (contentType === "exercise"
                        ? exerciseFavorites
                        : foodFavorites
                      ).has(item.id)
                        ? "star"
                        : "star-outline"
                    }
                    size={24}
                    color={
                      (contentType === "exercise"
                        ? exerciseFavorites
                        : foodFavorites
                      ).has(item.id)
                        ? COLORS.secondary
                        : COLORS.primary
                    }
                  />
                </TouchableOpacity>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
