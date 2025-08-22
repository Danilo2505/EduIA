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
import { listContents, ContentItem, Category } from "@/services/contents";

type Config = {
  titulo: string;
  ctaRotulo: string;
  ctaRota: Href;
  category: Category;
};

export default function makeListScreen(cfg: Config) {
  return function Screen() {
    const router = useRouter();
    const { novoItem } = useLocalSearchParams<{ novoItem?: string }>();
    const [items, setItems] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          const data = await listContents(cfg.category);
          setItems(data);
        } catch (err) {
          console.error("Erro ao carregar conteúdos:", err);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [cfg.category]);

    useEffect(() => {
      if (novoItem) {
        setItems((prev) => [
          {
            id: Date.now(),
            title: novoItem,
            body: "",
            category: cfg.category,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    }, [novoItem]);

    // 🔑 resumir texto do body
    const previewText = (text: string, maxLength = 120) => {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    return (
      <View style={s.safe}>
        <SafeAreaView>
          {/* Topo */}
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
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={s.card}
                onPress={() => router.push(`/contents/${item.id}` as any)}
              >
                <View style={s.cardHeader}>
                  {!!item.emoji && (
                    <Text style={s.cardEmoji}>{item.emoji}</Text>
                  )}
                  {!!item.tag && <Text style={s.cardTag}>{item.tag}</Text>}
                </View>
                <Text style={s.cardTitle}>{item.title}</Text>
                {!!item.body && (
                  <Text style={s.cardDesc}>
                    {item.body.length > 120
                      ? item.body.substring(0, 120) + "..."
                      : item.body}
                  </Text>
                )}
                <Text style={s.verMais}>Toque para ver mais</Text>
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
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  cardEmoji: { fontSize: 18, marginRight: 6 },
  cardTag: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardDesc: { fontSize: 13.5, color: "#4B5563", marginTop: 4, lineHeight: 20 },
  verMais: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 6,
    fontWeight: "500",
  },

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
