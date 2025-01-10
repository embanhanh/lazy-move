import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES, TextStyles, FONTS } from "../../constants/theme";
import { CommonActions } from "@react-navigation/native";

const PracticeDetail = ({ route, navigation }) => {
  const { previousScreen, type = "exercise", ...otherParams } = route.params;
  const { title, duration, points, image, description, ingredients, steps } =
    otherParams;
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    React.useState(false);
  const [textHeight, setTextHeight] = React.useState(0);
  const [maxHeight, setMaxHeight] = React.useState(0);

  const onTextLayout = (e) => {
    if (!isDescriptionExpanded) {
      setTextHeight(e.nativeEvent.lines.length);
    }
  };

  const onContainerLayout = (e) => {
    // Chiều cao của 2 dòng text (24 là lineHeight)
    setMaxHeight(24 * 2);
  };

  const shouldShowMoreButton = textHeight > 5;

  const handleStartVideo = () => {
    // Xử lý khi nhấn nút play video
    console.log("Play video");
  };

  const handleBack = () => {
    if (previousScreen === "Home") {
      navigation.dispatch(
        CommonActions.navigate({
          name: "HomeStack",
          params: {
            screen: "HomeMain",
          },
          merge: true,
        })
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="caret-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Image với overlay play button */}
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.exerciseImage} />
          <TouchableOpacity
            style={styles.playButton}
            onPress={handleStartVideo}
          >
            <View style={styles.playButtonCircle}>
              <Ionicons name="play" size={45} color={COLORS.text.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View
          style={[
            styles.infoCard,
            { minHeight: type === "exercise" ? 250 : "65%" },
          ]}
        >
          <View style={styles.infoHeader}>
            <View style={styles.infoRow}>
              <Ionicons
                name="timer-outline"
                size={20}
                color={COLORS.secondary}
              />
              <Text style={styles.infoText}>{duration}</Text>
            </View>
            <View style={styles.infoRow}>
              {type === "exercise" ? (
                <FontAwesome5
                  name="running"
                  size={20}
                  color={COLORS.secondary}
                />
              ) : (
                <MaterialCommunityIcons
                  name="fire"
                  size={20}
                  color={COLORS.secondary}
                />
              )}
              <Text style={styles.infoText}>{points}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View
            style={styles.descriptionContainer}
            onLayout={onContainerLayout}
          >
            {type === "exercise" ? (
              <>
                <Text style={styles.descriptionTitle}>Mô tả bài tập</Text>
                <ScrollView style={styles.descriptionScrollView}>
                  <Text
                    style={[
                      styles.description,
                      !isDescriptionExpanded && styles.descriptionCollapsed,
                    ]}
                    numberOfLines={isDescriptionExpanded ? undefined : 4}
                    onTextLayout={onTextLayout}
                  >
                    {description}
                  </Text>
                  {shouldShowMoreButton && (
                    <TouchableOpacity
                      style={styles.expandButton}
                      onPress={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                    >
                      <Text style={styles.expandButtonText}>
                        {isDescriptionExpanded ? "Thu gọn" : "Xem thêm"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </>
            ) : (
              <ScrollView style={styles.foodScrollView}>
                <View style={styles.foodSection}>
                  <Text style={styles.sectionTitle}>Nguyên liệu</Text>
                  {ingredients?.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredientText}>
                      • {ingredient}
                    </Text>
                  ))}
                </View>

                <View style={styles.foodSection}>
                  <Text style={styles.sectionTitle}>Cách làm</Text>
                  {steps?.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <Text style={styles.stepText}>
                        <Text style={styles.stepNumber}>
                          Bước {index + 1}:{" "}
                        </Text>
                        {step}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
      {type === "exercise" && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Bắt Đầu Tập</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.magicButton}>
            <View style={styles.magicButtonContent}>
              <Ionicons name="sparkles" size={24} color={COLORS.text.primary} />
              <Text style={styles.magicButtonText}>Làm giúp tôi</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
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
  content: {
    flex: 1,
    padding: SIZES.padding.large,
  },
  contentContainer: {
    // paddingBottom: SIZES.padding.xLarge,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: SIZES.radius.medium,
    marginBottom: SIZES.padding.large,
    position: "relative",
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.radius.medium,
  },
  playButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: SIZES.radius.medium,
  },
  playButtonCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    // Thêm shadow cho nút play
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.medium,
    padding: SIZES.padding.large,
    marginBottom: SIZES.padding.large,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: SIZES.padding.medium,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.small,
    backgroundColor: COLORS.background,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.small,
    minWidth: 130,
    justifyContent: "center",
  },
  infoText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.background,
    marginVertical: SIZES.padding.medium,
  },
  descriptionContainer: {
    padding: SIZES.padding.small,
    flex: 1,
  },
  descriptionTitle: {
    fontSize: SIZES.text.large,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  description: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    lineHeight: 24,
  },
  descriptionCollapsed: {
    marginBottom: SIZES.padding.small,
  },
  expandButton: {
    alignSelf: "flex-start",
    marginTop: SIZES.padding.small,
  },
  expandButtonText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.medium,
    color: COLORS.secondary,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    alignItems: "center",
    marginBottom: SIZES.padding.medium,
  },
  startButtonText: {
    fontSize: SIZES.text.large,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  magicButton: {
    backgroundColor: COLORS.background,
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  magicButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.padding.small,
  },
  magicButtonText: {
    fontSize: SIZES.text.large,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: SIZES.padding.large,
    paddingBottom: SIZES.padding.medium,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.primary}20`,
  },
  descriptionScrollView: {
    flex: 1,
    maxHeight: 150,
  },
  foodScrollView: {
    flex: 1,
    maxHeight: 300,
  },
  foodSection: {
    marginBottom: SIZES.padding.medium,
  },
  sectionTitle: {
    fontSize: SIZES.text.large,
    fontFamily: FONTS.system,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: SIZES.padding.small,
  },
  ingredientText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    marginBottom: SIZES.padding.small,
    paddingLeft: SIZES.padding.small,
  },
  stepItem: {
    marginBottom: SIZES.padding.small,
    paddingLeft: SIZES.padding.small,
  },
  stepNumber: {
    fontFamily: FONTS.bold,
  },
  stepText: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    lineHeight: 24,
  },
});

export default PracticeDetail;
