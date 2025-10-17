import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import type { SortableGridDragEndParams, SortableGridRenderItem } from "react-native-sortables";
import Sortable from "react-native-sortables";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "./loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "@/global.css";

const SOLUTION = [
  [
    "Bab beáztatása előző este",
    "Hagyma és fokhagyma megpirítása zsíron",
    "Pirospaprika hozzáadása és elkeverése",
    "Felaprított marhahús lepirítása",
    "Fűszerezés és víz hozzáadása",
    "Hús főzése fedő alatt",
    "Beáztatott bab hozzáadása",
    "Zöldségek beletétele és továbbfőzés",
    "Csipetke hozzáadása",
    "Pihentetés és tálalás",
  ],
];

export default function Babgulyas() {
  const router = useRouter();
  const [data, setData] = useState<string[]>([]);
  const [lockedItems, setLockedItems] = useState<string[]>([]);
  const [incorrectItems, setIncorrectItems] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const randomized = RandomizeArray(SOLUTION[0]);
    setData(randomized);
    setInitialized(true);
  }, []);

  function RandomizeArray<T>(arr: T[]): T[] {
    const new_arr = [...arr];
    for (let i = new_arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [new_arr[i], new_arr[j]] = [new_arr[j], new_arr[i]];
    }
    if (JSON.stringify(new_arr) === JSON.stringify(arr)) {
      return RandomizeArray(arr);
    }
    return new_arr;
  }

  const renderItem = useCallback<SortableGridRenderItem<string>>(
    ({ item }) => {
      const isLocked = lockedItems.includes(item);
      const isIncorrect = incorrectItems.includes(item);

      return (
        <TouchableOpacity
          disabled={isLocked} // 🔒 Teljesen letiltjuk az interakciót
          activeOpacity={1}
          style={[
            styles.card,
            isLocked && styles.correctCard,
            isIncorrect && styles.incorrectCard,
          ]}
        >
          <Text
            style={[
              styles.cardText,
              isLocked && { color: "#244D3C" },
              isIncorrect && { color: "white" },
            ]}
          >
            {item} {isLocked ? "✅" : ""}
          </Text>
        </TouchableOpacity>
      );
    },
    [lockedItems, incorrectItems]
  );

  const CheckOrder = async () => {
    const correctOrder = SOLUTION[0];
    const newLocked: string[] = [];
    const newIncorrect: string[] = [];

    data.forEach((item, i) => {
      if (item === correctOrder[i]) newLocked.push(item);
      else newIncorrect.push(item);
    });

    const allLocked = Array.from(new Set([...lockedItems, ...newLocked]));
    setLockedItems(allLocked);
    setIncorrectItems(newIncorrect);

    // ✅ ha minden jó, automatikusan tovább
    if (allLocked.length === correctOrder.length) {
      try {
        // 🔹 Lekérjük a kérdőív válaszokat
        const quizAnswers = await AsyncStorage.getItem("QUIZ_ANSWERS");
        const quizScore = await AsyncStorage.getItem("QUIZ_SCORE");
        const quizResult = await AsyncStorage.getItem("QUIZ_RESULT");

        const payload = {
          id: null,
          solution: [
            [
              quizResult ?? "Ismeretlen típus",
              quizAnswers ? JSON.parse(quizAnswers) : [],
              `Pontszám: ${quizScore ?? "n/a"}`,
            ],
            [...SOLUTION[0]],
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        console.log("📦 Küldés:", payload);

        const res = await fetch("https://weiss-toborzas-api.fly.dev/api/quiz-solution", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);

        console.log("✅ Sikeres mentés:", await res.json());

        Alert.alert("🎉 Kész!", "Gratulálunk! Minden lépés helyes!");
        setTimeout(() => router.push("/feedback"), 1500);
      } catch (error) {
        console.error("❌ Hiba az adatküldésnél:", error);
        Alert.alert("Hiba", "Nem sikerült elküldeni az eredményt.");
      }
    }
  };

  if (!initialized) return <LoadingScreen />;

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-neutral-900">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Sortable.Grid
          columns={1}
          data={data}
          renderItem={renderItem}
          rowGap={10}
          columnGap={10}
          dragActivationDelay={0}
          overDrag="none"
          onDragEnd={(params: SortableGridDragEndParams<string>) => {
            const draggedData = params.data;
            const movable = draggedData.filter(
              (item) => !lockedItems.includes(item)
            );

            const newOrder: string[] = [];
            let movableIndex = 0;

            for (let i = 0; i < SOLUTION[0].length; i++) {
              const correctItem = SOLUTION[0][i];
              if (lockedItems.includes(correctItem)) {
                newOrder.push(correctItem);
              } else {
                newOrder.push(movable[movableIndex]);
                movableIndex++;
              }
            }

            setData(newOrder);
          }}
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={CheckOrder}>
            <Text style={styles.buttonText}>Ellenőrzés</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🔹 Stílusok
const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#cdefa9",
    color: "#090909",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 50,
    marginBottom: 10,
  },
  correctCard: {
    backgroundColor: "#009877",
  },
  incorrectCard: {
    backgroundColor: "#FF6F59",
  },
  cardText: {
    color: "#090909",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 50,
  },
  button: {
    borderRadius: 8,
    padding: 20,
    backgroundColor: "#244D3C",
  },
  buttonText: {
    color: "#fafafa",
    textAlign: "center",
    fontWeight: "700",
  },
});
