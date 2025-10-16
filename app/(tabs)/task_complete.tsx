import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const completedNum = typeof params.completed === 'string' ? parseInt(params.completed, 10) : 0;
  const totalNum = typeof params.total === 'string' ? parseInt(params.total, 10) : 0;
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Feladat megoldva, így tovább!</ThemedText>
      <ThemedText type="subtitle">Feladat {completedNum}/{totalNum}</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">A következő feladatra!</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
