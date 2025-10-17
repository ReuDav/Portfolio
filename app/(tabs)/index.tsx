import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const hasQuiz = await AsyncStorage.getItem("QUIZ_ANSWERS");
        if (!hasQuiz) {
          console.log("➡️ Első indítás — irány a kérdőív (questions)!");
          router.replace("/questions");
        } else {
          console.log("➡️ Kérdőív megvan — irány a babgulyás feladat!");
          router.replace("/babgulyas");
        }
      } catch (err) {
        console.error("❌ Hiba az IndexScreen-nél:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && <ActivityIndicator size="large" color="#009877" />}
    </View>
  );
}
