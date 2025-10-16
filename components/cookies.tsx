import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CookiePopup() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <View className="absolute inset-0 justify-end items-center bg-black/50 z-50">
      <ThemedView className="w-full p-4 bg-white dark:bg-neutral-900 rounded-t-2xl">
        <ThemedText className="text-center mb-4">
          Az oldal sütiket használ a jobb működés érdekében.
        </ThemedText>
        <Pressable
          onPress={() => setVisible(false)}
          className="bg-blue-600 py-3 rounded-lg"
        >
          <ThemedText className="text-center text-white font-semibold">
            Elfogadom
          </ThemedText>
        </Pressable>
      </ThemedView>
    </View>
  );
}