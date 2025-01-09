import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, TextStyles, FONTS } from "../../constants/theme";

// const { width } = Dimensions.get("window");

const AnimatedCharacter = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const chatAnim = useRef(new Animated.Value(0)).current;
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showInteractionModal, setShowInteractionModal] = useState(false);

  const startBounceAnimation = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -5,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => startBounceAnimation());
  };

  const startFloatAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const messages = [
    "Cùng tuyện tập với tôi nhé!",
    "Hãy bắt đầu ngày mới với những bài tập đơn giản",
    "Vận động nhẹ nhàng thôi nào! Chỉ cần vài phút mỗi ngày",
    "Bạn đã sẵn sàng cho buổi tập thú vị chưa?",
  ];

  const showChatBubble = () => {
    // Chọn ngẫu nhiên một tin nhắn từ mảng messages
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setShowChat(true);

    Animated.sequence([
      Animated.timing(chatAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(chatAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowChat(false));
  };

  useEffect(() => {
    startBounceAnimation();
    startFloatAnimation();
    // Hiển thị chat bubble mỗi 5 giây
    const interval = setInterval(showChatBubble, 5000);
    return () => clearInterval(interval);
  }, []);

  const characterRotation = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-3deg", "3deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.characterWithChat}>
        <Animated.View
          style={[
            styles.characterContainer,
            {
              transform: [
                { translateY: bounceAnim },
                { rotate: characterRotation },
              ],
            },
          ]}
        >
          <Image
            source={require("../../../assets/imgs/character3d.png")}
            style={styles.character}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.chatBubble,
            {
              opacity: chatAnim,
              transform: [
                {
                  translateX: chatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
              display: showChat ? "flex" : "none",
            },
          ]}
        >
          <View style={styles.chatTextContainer}>
            <Text
              style={styles.chatText}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {currentMessage}
            </Text>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => setShowInteractionModal(true)}
        >
          <View style={styles.interactionButtonInner}>
            <Ionicons
              name="chatbubbles"
              size={24}
              color={COLORS.text.primary}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showInteractionModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInteractionModal(false)}
      >
        <TouchableOpacity
          style={[
            styles.modalOverlay,
            { pointerEvents: showInteractionModal ? "auto" : "none" },
          ]}
          activeOpacity={1}
          onPress={() => setShowInteractionModal(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOption}>
              <Ionicons name="mic" size={24} color={COLORS.text.primary} />
              <Text style={styles.modalOptionText}>Nói chuyện</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalOption, { marginTop: 10 }]}>
              <Ionicons
                name="chatbubble"
                size={24}
                color={COLORS.text.primary}
              />
              <Text style={styles.modalOptionText}>Nhắn tin</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  characterWithChat: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  characterContainer: {
    width: 160,
    height: 160,
    position: "relative",
    marginLeft: "12%",
    marginTop: "15%",
  },
  character: {
    width: "100%",
    height: "100%",
  },
  chatBubble: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    width: "45%",
    position: "absolute",
    bottom: "50%",
    right: 15,
  },
  chatTextContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chatText: {
    ...TextStyles.description,
    color: "#fff",
    lineHeight: 20,
    flexShrink: 1,
    fontFamily: FONTS.medium,
  },
  interactionButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  interactionButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.large,
    padding: SIZES.padding.large,
    minWidth: 200,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding.medium,
    borderRadius: SIZES.radius.medium,
    backgroundColor: COLORS.background,
  },
  modalOptionText: {
    marginLeft: SIZES.padding.medium,
    fontSize: SIZES.text.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
  },
});

export default AnimatedCharacter;
