import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Text, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

// const { width } = Dimensions.get("window");

const AnimatedCharacter = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const chatAnim = useRef(new Animated.Value(0)).current;
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

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

        {showChat && (
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
        )}
      </View>
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
    width: "50%",
    position: "absolute",
    bottom: "50%",
    right: 5,
  },
  chatTextContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chatText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    flexShrink: 1,
  },
});

export default AnimatedCharacter;
