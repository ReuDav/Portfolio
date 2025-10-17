import { useState } from 'react';
import { Modal, View, Pressable, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CookiePopup({ onAccept }: { onAccept: () => void }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      {/* 🔹 Fekete áttetsző háttér */}
      <View className="flex-1 bg-black/60 justify-end items-center">
        {/* 🔹 Alulról felcsúszó cookie box */}
        <ThemedView className="w-full px-6 py-5 bg-white dark:bg-neutral-900 rounded-t-2xl space-y-4 shadow-lg">
          <ThemedText className="text-center text-black dark:text-white text-base">
            Az oldal sütiket használ a jobb működés és élmény érdekében.
          </ThemedText>

          {/* ✅ Elfogadás gomb */}
          <Pressable
            className="w-full py-3 bg-[#009877] rounded-lg active:opacity-80"
            onPress={() => {
              onAccept();
              setVisible(false);
            }}
          >
            <ThemedText className="text-center text-white font-semibold text-base">
              Elfogadom
            </ThemedText>
          </Pressable>

          {/* ❌ Elutasítás gomb */}
          <Pressable
            className="w-full py-3 bg-[#A7C4A0] rounded-lg active:opacity-80"
            onPress={() => setVisible(false)}
          >
            <ThemedText className="text-center text-white font-semibold text-base">
              Elutasítom
            </ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </Modal>
  );
}
