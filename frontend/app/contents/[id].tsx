import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getContentById, ContentItem } from "@/services/contents";

export default function ContentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        if (id) {
          const content = await getContentById(Number(id));
          setItem(content);
        }
      } catch (err) {
        console.error("Erro ao carregar detalhe:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={s.container}>
        <ActivityIndicator
          size="large"
          color="#6B7280"
          style={{ marginTop: 40 }}
        />
        <Text style={s.loading}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={s.container}>
        <Text style={s.loading}>Conteúdo não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Topo */}
        <View style={s.header}>
          <Pressable onPress={() => router.back()} style={s.backBtn}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={22}
              color="#111827"
            />
          </Pressable>
          <Text style={s.headerTitle}>Detalhes</Text>
        </View>

        {/* Card Detalhe */}
        <View style={s.card}>
          <View style={s.cardHeader}>
            {!!item.emoji && <Text style={s.cardEmoji}>{item.emoji}</Text>}
            {!!item.tag && <Text style={s.cardTag}>{item.tag}</Text>}
          </View>

          <Text style={s.cardTitle}>{item.title}</Text>
          {!!item.body && <Text style={s.cardBody}>{item.body}</Text>}

          <Text style={s.date}>
            Criado em {new Date(item.created_at).toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7FA" },
  loading: { marginTop: 12, textAlign: "center", color: "#6B7280" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backBtn: { padding: 6, marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  cardEmoji: { fontSize: 22, marginRight: 6 },
  cardTag: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },
  cardBody: {
    fontSize: 15,
    color: "#374151",
    marginTop: 12,
    lineHeight: 22,
  },
  date: { fontSize: 12, color: "#9CA3AF", marginTop: 16, textAlign: "right" },
});
