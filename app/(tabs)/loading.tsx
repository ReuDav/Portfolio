import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet } from "react-native";

export default function LoadingScreen() {
	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title">Betöltés...</ThemedText>
			<ThemedText type="subtitle">Kérlek várj egy pillanatot...</ThemedText>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});