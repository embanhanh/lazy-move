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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
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
  const favoriteAnimations = useRef({}).current;

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

  const handleExercisePress = (exercise) => {
    navigation.navigate("PracticeDetail", {
      ...exercise,
      previousScreen: "Home",
    });
  };

  const toggleFavorite = (exerciseId) => {
    if (!favoriteAnimations[exerciseId]) {
      favoriteAnimations[exerciseId] = new Animated.Value(1);
    }

    Animated.sequence([
      Animated.timing(favoriteAnimations[exerciseId], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(favoriteAnimations[exerciseId], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(favoriteAnimations[exerciseId], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(exerciseId)) {
        newFavorites.delete(exerciseId);
      } else {
        newFavorites.add(exerciseId);
      }
      return newFavorites;
    });
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
        <AnimatedCharacter />
      </View>

      {/* Exercise List Section */}
      <View style={styles.exerciseListContainer}>
        <Text style={styles.sectionTitle}>Hành Trình Lười Biến Mất</Text>
        <Text style={styles.sectionSubtitle}>
          Khám Phá Thói Quen Vận Động Dễ Dàng
        </Text>

        <ScrollView style={styles.exerciseList}>
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => handleExercisePress(exercise)}
            >
              <Image source={exercise.image} style={styles.exerciseImage} />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <View style={styles.exerciseDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="timer-outline" size={16} color="#888" />
                    <Text style={styles.exerciseDuration}>
                      {exercise.duration}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <FontAwesome5 name="running" size={16} color="#888" />
                    <Text style={styles.exercisePoints}>{exercise.points}</Text>
                  </View>
                </View>
              </View>
              <Animated.View
                style={[
                  styles.favoriteButton,
                  {
                    transform: [
                      {
                        scale: favoriteAnimations[exercise.id] || 1,
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => toggleFavorite(exercise.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={favorites.has(exercise.id) ? "star" : "star-outline"}
                    size={24}
                    color={
                      favorites.has(exercise.id)
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
