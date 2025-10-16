import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title">Helytelen sorrend!</ThemedText>
			<ThemedText type="subtitle">Próbáld újra!</ThemedText>
			<Link href="/" dismissTo style={styles.link}>
				<ThemedText type="link">Vissza a feladathoz</ThemedText>
			</Link>
		</ThemedView>
	)
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