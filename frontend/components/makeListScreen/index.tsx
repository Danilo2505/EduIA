import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Item = {
  id: string;
  titulo: string;
  descricao?: string;
  tag?: string;
  emoji?: string;
};

type Config = {
  titulo: string;
  ctaRotulo: string;
  ctaRota: Href;
  seed?: Item[];
};

export default function makeListScreen(cfg: Config) {
  return function Screen() {
    const router = useRouter();
    const { novoItem } = useLocalSearchParams<{ novoItem?: string }>();
    const [items, setItems] = useState<Item[]>(cfg.seed ?? []);

    useEffect(() => {
      if (novoItem && typeof novoItem === "string") {
        setItems((prev) => [
          { id: Date.now().toString(), titulo: novoItem },
          ...prev,
        ]);
      }
    }, [novoItem]);

    return (
      <View style={s.safe}>
        <SafeAreaView>
          {/* Topo personalizado */}
          <View style={s.header}>
            <Pressable onPress={() => router.back()} style={s.backBtn}>
              <Ionicons
                name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
                size={22}
                color="#111827"
              />
            </Pressable>
            <Text style={s.title}>{cfg.titulo}</Text>
            <Pressable
              onPress={() => router.push(cfg.ctaRota as any)}
              style={({ pressed }) => [s.cta, pressed && { opacity: 0.9 }]}
            >
              <Text style={s.ctaText}>＋ {cfg.ctaRotulo}</Text>
            </Pressable>
          </View>

          {/* Lista */}
          <FlatList
            contentContainerStyle={s.listContainer}
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <Pressable style={s.card}>
                <View style={s.cardHeader}>
                  {!!item.emoji && (
                    <Text style={s.cardEmoji}>{item.emoji}</Text>
                  )}
                  {!!item.tag && <Text style={s.cardTag}>{item.tag}</Text>}
                </View>
                <Text style={s.cardTitle}>{item.titulo}</Text>
                {!!item.descricao && (
                  <Text style={s.cardDesc}>{item.descricao}</Text>
                )}
              </Pressable>
            )}
            ListEmptyComponent={
              <View style={s.empty}>
                <Text style={s.emptyEmoji}>✨</Text>
                <Text style={s.emptyTitle}>Nada por aqui ainda</Text>
                <Text style={s.emptyDesc}>
                  Toque em “{cfg.ctaRotulo}” para adicionar o primeiro item.
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  };
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F7FA", padding: 20, paddingTop: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backBtn: { padding: 6, marginRight: 8 },
  title: { fontSize: 20, fontWeight: "800", color: "#111827", flex: 1 },
  cta: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  ctaText: { color: "#fff", fontWeight: "800", fontSize: 14 },

  listContainer: { paddingBottom: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  cardEmoji: { fontSize: 18, marginRight: 6 },
  cardTag: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardDesc: { fontSize: 13.5, color: "#4B5563", marginTop: 4 },

  empty: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    marginTop: 8,
  },
  emptyEmoji: { fontSize: 28, marginBottom: 8 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  emptyDesc: {
    fontSize: 13.5,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
});
