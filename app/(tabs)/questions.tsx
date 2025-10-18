import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Linking,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { QUESTIONS } from '@/utils/question';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

function shuffleArray<T>(arr: T[]): T[] {
  return arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

export default function QuestionScreen() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; answer: string; points: number }[]>([]);
  const [randomizedQuestions, setRandomizedQuestions] = useState<typeof QUESTIONS>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const randomized = QUESTIONS.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setRandomizedQuestions(randomized);
  }, []);

  const handleAnswer = (answer: string, points: number) => {
    const updated = [...answers];
    updated[current] = {
      question: randomizedQuestions[current].question,
      answer,
      points,
    };
    setAnswers(updated);
  };

  const handleNext = async () => {
    if (!answers[current]) return;

    if (current < randomizedQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      const total = answers.reduce((a, b) => a + b.points, 0);
      let resultType = '';
      if (total <= 18) resultType = '💻 Szoftverfejlesztő';
      else if (total <= 30) resultType = '🖥️ Rendszergazda';
      else resultType = '👮 Rendész';

      await AsyncStorage.setItem('QUIZ_ANSWERS', JSON.stringify(answers));
      await AsyncStorage.setItem('QUIZ_SCORE', JSON.stringify(total));
      await AsyncStorage.setItem('QUIZ_RESULT', resultType);

      setResult(resultType);
      setModalVisible(true);
    }
  };

  if (!randomizedQuestions.length) return <ThemedText>Betöltés...</ThemedText>;
  const q = randomizedQuestions[current];

  // 🔹 Rövid leírások a modalhoz + szaklinkek
  const info: Record<
    string,
    { desc: string; link: string }
  > = {
    '💻 Szoftverfejlesztő': {
      desc: 'Szeretsz logikusan gondolkodni, problémákat megoldani és új dolgokat építeni.',
      link: 'https://wm-iskola.hu/szakkepzes/informatika/szoftverfejleszto-es-tesztelo',
    },
    '🖥️ Rendszergazda': {
      desc: 'Te vagy az, aki mindig tudja, mi miért nem működik – és meg is oldja.',
      link: 'https://wm-iskola.hu/szakkepzes/informatika/informatikai-rendszer-es-alkalmazas-uzemelteto-technikus',
    },
    '👮 Rendész': {
      desc: 'Szeretsz segíteni másokon és rendet tartani – a biztonság fontos neked.',
      link: 'https://wm-iskola.hu/szakkepzes/kozszolgalat/rendeszeti-or',
    },
  };

  return (
    <ThemedView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 🔹 Kérdés */}
        <ThemedText style={styles.question}>{q.question}</ThemedText>

        {/* 🔹 Opciók */}
        {q.options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.option,
              answers[current]?.answer === opt.text && styles.optionSelected,
            ]}
            onPress={() => handleAnswer(opt.text, opt.points)}
          >
            <Text
              style={[
                styles.optionText,
                answers[current]?.answer === opt.text && styles.optionTextSelected,
              ]}
            >
              {opt.text}
            </Text>
          </TouchableOpacity>
        ))}

        {/* 🔹 Progress + Gomb */}
        <ThemedText style={styles.progress}>
          {`${current + 1} / ${randomizedQuestions.length}`} kérdés megválaszolva
        </ThemedText>

        <Pressable style={styles.button} onPress={handleNext}>
          <ThemedText style={styles.buttonText}>
            {current === randomizedQuestions.length - 1 ? 'Befejezés' : 'Tovább'}
          </ThemedText>
        </Pressable>
      </ScrollView>

      {/* 🔹 Modal az eredményhez */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalBox}>
            <ThemedText style={styles.modalResult}>
              Te egy remek {result} lehetsz a Weiss-ben!
            </ThemedText>

            {result && (
              <ThemedText style={styles.modalDesc}>{info[result].desc}</ThemedText>
            )}

            {/* 🔹 Szakhoz tartozó link */}
            <Pressable
              style={styles.modalButtonPrimary}
              onPress={() => {
                if (result) Linking.openURL(info[result].link);
              }}
            >
              <ThemedText style={styles.modalButtonText}>
                Tudj meg többet erről a szakról 🔗
              </ThemedText>
            </Pressable>

            {/* 🔹 Teszt újrakezdése */}
            <Pressable
              style={styles.modalButtonSecondary}
              onPress={() => {
                setModalVisible(false);
                router.push('/babgulyas');
              }}
            >
              <ThemedText style={styles.modalButtonText}>
                Következő feladat
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    padding: 30,
    justifyContent: 'center',
  },
  question: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 25,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: 'center',
    backgroundColor: "#d8d8d8",
    color: "#090909"
  },
  optionSelected: {
    backgroundColor: '#009877',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
  progress: {
    marginBottom: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 40,
    backgroundColor: '#244D3C',
  },
  buttonText: {
    color: '#fafafa',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },

  // 🔹 Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalResult: {
    fontSize: 20,
    fontWeight: '700',
    color: '#009877',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  modalButtonPrimary: {
    backgroundColor: '#009877',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
    width: '100%',
  },
  modalButtonSecondary: {
    backgroundColor: '#244D3C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
  },
  modalButtonText: {
    color: '#fafafa',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});
