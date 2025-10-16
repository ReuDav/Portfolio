// app/(tabs)/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{
        headerTitleAlign: "center"
    }}>
      <Stack.Screen name="index" options={{ title: "Algoritmus"}}/>
      <Stack.Screen name="finished" options={{ title: 'Gratulálok!' }} />
      <Stack.Screen name="task_complete" options={{title: 'Feladat megoldva!' }} />
      <Stack.Screen name="incorrect" options={{ presentation: 'modal', title: 'Helytelen sorrend!', headerShown:false }} />
      <Stack.Screen name="loading" options={{ presentation: 'modal', title: 'Betöltés...', headerShown:false }} />
      <Stack.Screen name="cookies" options={{ headerShown: false }} />
    </Stack>
  );
}
