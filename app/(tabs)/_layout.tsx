import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{
        headerTitleAlign: "center"
    }}>
      <Stack.Screen name="index" options={{ title: "Kezdőlap"}}/>
      <Stack.Screen name="babgulyas" options={{ title: "Tedd sorrendbe egy babgulyás elkészítésének sorrendjét!"}}/>
      <Stack.Screen name="questions" options={{ title: "Kérlek válaszd ki a 4 állítás közül azt, amelyik a legjobban illik Rád!"}}/>
      <Stack.Screen name="finished" options={{ title: 'Gratulálok!' }} />
      <Stack.Screen name="task_complete" options={{title: 'Feladat megoldva!' }} />
      <Stack.Screen name="incorrect" options={{ presentation: 'modal', title: 'Helytelen sorrend!', headerShown:false }} />
      <Stack.Screen name="loading" options={{ presentation: 'modal', title: 'Betöltés...', headerShown:false }} />
      <Stack.Screen name="cookies" options={{ headerShown: false }} />
    </Stack>
  );
}
