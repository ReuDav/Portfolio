import { DarkTheme, DefaultTheme, ThemeProvider, useNavigationContainerRef } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { HeaderTitle } from '@react-navigation/elements';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookiePopup from '@/components/cookies';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string | null>(null);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(null);

  // 🔹 Ellenőrizzük, hogy el lett-e már fogadva a cookie
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('cookies_accepted');
        if (saved !== null) {
          setCookiesAccepted(JSON.parse(saved));
        } else {
          setCookiesAccepted(false);
        }
      } catch (err) {
        console.error('❌ Cookie check error:', err);
      }
    })();
  }, []);

  // 🔹 Cookie elfogadás kezelése
  const handleAcceptCookies = async () => {
    try {
      await AsyncStorage.setItem('cookies_accepted', JSON.stringify(true));
      setCookiesAccepted(true);
    } catch (err) {
      console.error('❌ Cookie save error:', err);
    }
  };

  // 🔁 Automatikus log minden navigációnál
  useEffect(() => {
    const sendVisitLog = async (route: string) => {
      try {
        await fetch(`https://api.legyelinformatikus.hu/?page=${encodeURIComponent(route)}`);
      } catch (err) {
        console.error("❌ Visit log error:", err);
      }
    };

    const logOnReady = () => {
      const route = navigationRef.getCurrentRoute()?.name ?? 'unknown';
      routeNameRef.current = route;
      sendVisitLog(route);
    };

    const logOnChange = () => {
      const currentRoute = navigationRef.getCurrentRoute()?.name ?? 'unknown';
      if (routeNameRef.current !== currentRoute) {
        routeNameRef.current = currentRoute;
        sendVisitLog(currentRoute);
      }
    };

    const unsubscribe = navigationRef.addListener('state', logOnChange);

    return () => {
      unsubscribe();
    };
  }, [navigationRef]);

  const shouldShowPopup = cookiesAccepted === false;

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.container}>
          <HeaderTitle />
          <Stack
            screenOptions={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </View>

        {shouldShowPopup && (
          <View style={styles.popupContainer}>
            <CookiePopup onAccept={handleAcceptCookies} />
          </View>
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
