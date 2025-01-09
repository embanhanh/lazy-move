import { useFonts } from "expo-font";

export const COLORS = {
  primary: "#b3a0ff", // Màu tím chủ đạo của bạn
  secondary: "#e2f163", // Màu vàng cho các điểm nhấn
  background: "#1a1a1a", // Màu nền đen
  card: "#2a2a2a", // Màu nền card
  text: {
    primary: "#fff", // Màu chữ chính
    secondary: "#e2f163", // Màu chữ phụ
  },
  icon: {
    active: "#e2f163", // Màu icon khi active
    inactive: "#fff", // Màu icon khi không active
  },
  success: "#4CAF50",
};

export const FONTS = {
  regular: "Quicksand-Regular",
  medium: "Quicksand-Medium",
  semiBold: "Quicksand-SemiBold",
  bold: "Quicksand-Bold",
  system: undefined,
};

export const SIZES = {
  padding: {
    small: 8,
    medium: 15,
    large: 20,
    xLarge: 30,
  },
  radius: {
    small: 10,
    medium: 15,
    large: 20,
  },
  text: {
    small: 12,
    medium: 14,
    large: 16,
    xLarge: 20,
    title: 20,
    header: 24,
  },
};

export const TextStyles = {
  header: {
    fontSize: SIZES.text.header,
    fontFamily: FONTS.system,
    fontWeight: "bold",
  },
  title: {
    fontSize: SIZES.text.title,
    fontFamily: FONTS.system,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: SIZES.text.large,
    fontFamily: FONTS.medium,
  },
  description: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
  },
  emphasis: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.system,
    fontWeight: "bold",
  },
  highlight: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.bold,
  },
  regular: {
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.regular,
  },
  small: {
    fontSize: SIZES.text.small,
    fontFamily: FONTS.regular,
  },
};
