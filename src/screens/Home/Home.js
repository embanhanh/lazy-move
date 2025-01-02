import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import exercise1 from "../../../assets/imgs/exercise1.png";
import { styles } from "./styles";
import { COLORS } from "../../constants/theme";
import AnimatedCharacter from "../../components/AnimatedCharacter/AnimatedCharacter";
import LazyReminder from "../../components/LazyReminder/LazyReminder";

const Home = () => {
  const navigation = useNavigation();
  const [showReminder, setShowReminder] = useState(false);

  const exercises = [
    {
      id: 1,
      title: "Xoay Vai Thư Giãn",
      duration: "2 Phút",
      points: "200 Lazy Points",
      image: exercise1,
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
      image: exercise1,
      isFavorite: true,
      description: "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng",
    },
    {
      id: 4,
      title: "Vươn Vai",
      duration: "2 Phút",
      points: "300 Lazy Points",
      image: exercise1,
      isFavorite: true,
      description: "Bài tập giúp thư giãn vai và cổ, giảm căng thẳng",
    },
  ];

  const handleExercisePress = (exercise) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "PracticeStack",
        params: {
          screen: "PracticeDetail",
          params: {
            exerciseId: exercise.id,
            title: exercise.title,
            duration: exercise.duration,
            points: exercise.points,
            image: exercise.image,
            description: exercise.description,
            previousScreen: "Home",
          },
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      {showReminder && <LazyReminder />}
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
          <Ionicons name="notifications" size={24} color="#b3a0ff" />
        </TouchableOpacity>
      </View>

      {/* Character Section */}
      <AnimatedCharacter />

      {/* Exercise List Section */}
      <Text style={styles.sectionTitle}>Hành Trình Lười Biếng Mất</Text>
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
                  <Ionicons name="star" size={16} color="#888" />
                  <Text style={styles.exercisePoints}>{exercise.points}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="star-outline" size={24} color="#b3a0ff" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
