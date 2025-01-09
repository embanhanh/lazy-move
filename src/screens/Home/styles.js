import { StyleSheet } from "react-native";
import { COLORS, SIZES, TextStyles, FONTS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 40,
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.padding.large,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    ...TextStyles.header,
    color: COLORS.primary,
  },
  subGreeting: {
    ...TextStyles.description,
    color: COLORS.text.primary,
    marginTop: 4,
  },
  notificationButton: {
    padding: 8,
  },
  characterContainer: {
    flex: 1,
    justifyContent: "center",
  },
  exerciseListContainer: {
    flex: 1.618,
  },
  sectionTitle: {
    ...TextStyles.title,
    color: COLORS.secondary,
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.medium,
    color: "#888",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  exerciseList: {
    paddingHorizontal: 20,
  },
  exerciseCard: {
    backgroundColor: "#2a2a2a",
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    position: "relative",
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 15,
  },
  exerciseTitle: {
    ...TextStyles.emphasis,
    color: "#fff",
    marginBottom: 5,
  },
  exerciseDetails: {
    flexDirection: "column",
    gap: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  exerciseDuration: {
    ...TextStyles.small,
    color: "#888",
  },
  exercisePoints: {
    fontSize: 14,
    color: "#888",
  },
  favoriteButton: {
    padding: 8,
  },
  newTag: {
    position: "absolute",
    top: -10,
    right: 10,
    backgroundColor: "#b3a0ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  newTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
