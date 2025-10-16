import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import type { SortableGridDragEndParams, SortableGridRenderItem } from 'react-native-sortables';
import Sortable from 'react-native-sortables';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import LoadingScreen from './loading';
import "@/global.css";
import CookiePopup from "@/components/cookies";

// 🔹 Web kliens infó lekérése
async function getWebClientInfo() {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();

    const ua = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const online = navigator.onLine;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const colorDepth = window.screen.colorDepth;
    const hardwareConcurrency = navigator.hardwareConcurrency || null;
    const deviceMemory = (navigator as any).deviceMemory || null;

    const browserInfo = parseUserAgent(ua);

    return {
      ipAddress: ipData?.ip ?? 'unknown',
      userAgent: ua,
      browser: browserInfo.browser,
      browserVersion: browserInfo.version,
      os: browserInfo.os,
      platform,
      language,
      timezone,
      online,
      screenWidth,
      screenHeight,
      colorDepth,
      hardwareConcurrency,
      deviceMemory,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ getWebClientInfo() error:', error);
    return { error: String(error) };
  }
}

function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let version = 'Unknown';
  let os = 'Unknown';

  if (ua.includes('Edg')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome')) browser = 'Google Chrome';
  else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
  else if (ua.includes('Safari')) browser = 'Apple Safari';
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';

  const versionMatch = ua.match(/(Chrome|Firefox|Safari|Edg|OPR)\/([\d.]+)/);
  if (versionMatch) version = versionMatch[2];

  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return { browser, version, os };
}

// 🧩 Megoldások
const SOLUTION: string[][] = [
  ["1. lépés", "2. lépés", "3. lépés", "4. lépés", "5. lépés"],
  ["Első", "Második", "Harmadik", "Negyedik", "Ötödik"],
  ["Egy", "Kettő", "Három", "Négy", "Öt"],
];

const router = useRouter();

async function loadValue(key: string, _default: any = null): Promise<any | null> {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : _default;
}
async function saveValue(key: string, value: any): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

function Random(min: number, max: number, notInclude: number[] = []): number {
  let tries = 0;
  while (tries < 50) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!notInclude.includes(num)) return num;
    tries++;
  }
  throw new Error("Random(): no valid number found");
}

async function getTask(): Promise<{ index: number; task: string[] }> {
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
  const USED_NUMBERS: number[] = await loadValue("USED_NUMBERS", []);
  if (USED_NUMBERS.length >= SOLUTION.length) {
    router.push('/finished');
    return { index: -1, task: [] };
  }
  const rnd = Random(0, SOLUTION.length - 1, USED_NUMBERS);
  return { index: rnd, task: RandomizeArray(SOLUTION[rnd]) };
}

export default function Grid() {
  const [data, setData] = useState<string[] | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [cookies_accepted, setCookies] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getTask();
      setData(result.task);
      setIndex(result.index);
      setCookies(await loadValue("cookies_accepted", false));

      // 🔹 WEB kliens adatküldés
      if (Platform.OS === "web") {
        const SENT_KEY = "DEVICE_INFO_SENT";
        const alreadySent = await AsyncStorage.getItem(SENT_KEY);
        if (alreadySent) {
          console.log("ℹ️ Web kliens adatok már elküldve.");
          return;
        }

        const deviceData = await getWebClientInfo();

        const payload = {
          platform: 'web',
          ip_address: deviceData.ipAddress ?? null,
          user_agent: deviceData.userAgent ?? null,
          browser: deviceData.browser ?? null,
          browser_version: deviceData.browserVersion ?? null,
          os: deviceData.os ?? null,
          screen_width: deviceData.screenWidth ?? null,
          screen_height: deviceData.screenHeight ?? null,
          language: deviceData.language ?? null,
          timezone: deviceData.timezone ?? null,
          hardware_concurrency: deviceData.hardwareConcurrency ?? null,
          device_memory: deviceData.deviceMemory ?? null,
          online: deviceData.online ?? null,
          created_at: deviceData.createdAt ?? new Date().toISOString(),
        };

        try {
          console.log("📦 Küldés:", payload);

          const res = await fetch("https://weiss-toborzas-api.fly.dev/api/steal-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          console.log("🌐 Válasz státusz:", res.status);

          if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);

          const json = await res.json();
          console.log("✅ Sikeres mentés:", json);

          await AsyncStorage.setItem(SENT_KEY, "true");
        } catch (err) {
          console.error("❌ Adatküldési hiba:", err);
        }
      }
    })();
  }, []);

  const renderItem = useCallback<SortableGridRenderItem<string>>(
    ({ item }) => (
      <View style={styles.card}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  const CheckOrder = async () => {
    const IsCorrect =
      index !== null && JSON.stringify(data) === JSON.stringify(SOLUTION[index]);
    console.log('Is correct:', IsCorrect);

    if (IsCorrect) {
      let USED_NUMBERS: number[] = await loadValue("USED_NUMBERS");
      const numberSet = new Set(USED_NUMBERS);
      numberSet.add(index!);
      USED_NUMBERS = Array.from(numberSet);
      await saveValue("USED_NUMBERS", USED_NUMBERS);

      if (USED_NUMBERS.length >= SOLUTION.length) {
        try {
          const timestamp = new Date().toISOString();
          const payload = {
            id: null,
            solution: SOLUTION,
            created_at: timestamp,
            updated_at: timestamp,
          };

          const response = await fetch('https://weiss-toborzas-api.fly.dev/api/quiz-solution', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok)
            throw new Error(`Fetch error: ${response.statusText}`);

          const result = await response.json();
          console.log('✅ Összes feladat elküldve:', result);

          Alert.alert('🎉 Kész!', 'Minden feladatot teljesítettél!');
          router.push('/finished');
        } catch (err) {
          console.error('❌ Hiba a fetch során:', err);
          Alert.alert('Hiba', 'Nem sikerült elküldeni az adatokat.');
        }
        return;
      }

      const next = await getTask();
      setData(next.task);
      setIndex(next.index);

      router.push({
        pathname: '/task_complete',
        params: {
          completed: USED_NUMBERS.length,
          total: SOLUTION.length,
        },
      });
    } else {
      router.push('/incorrect');
    }
  };

  if (!data) return <LoadingScreen />;

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Sortable.Grid
        columns={1}
        data={data}
        renderItem={renderItem}
        rowGap={10}
        columnGap={10}
        onDragEnd={(params: SortableGridDragEndParams<string>) => {
          setData(params.data);
        }}
        overDrag="none"
        dragActivationDelay={0}
      />

      <View style={{ marginTop: 20, marginHorizontal: 50 }}>
        <Button title="Ellenőrzés" onPress={CheckOrder} />
      </View>

      {cookies_accepted == false && <CookiePopup />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 152, 119, 1)',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginInline: 50,
  },
});
