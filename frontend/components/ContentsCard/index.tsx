import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ContentItem } from "@/services/contents";
import { useRouter } from "expo-router";

type Props = {
  item: ContentItem;
};

export default function ContentsCard({ item }: Props) {
  const router = useRouter();

  const previewText = (text: string, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Pressable
      onPress={() => router.push(`/contents/${item.id}`)} 
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardEmoji}>{item.emoji ?? "📘"}</Text>
        <Text style={styles.cardCategoria}>{item.category}</Text>
      </View>
      <Text style={styles.cardTitulo}>{item.title}</Text>
      <Text style={styles.cardDescricao}>{previewText(item.body)}</Text>
      <Text style={styles.verMais}>Toque para ver mais</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  cardCategoria: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  cardTitulo: { fontSize: 16, fontWeight: "700", color: "#111827" },
  cardDescricao: {
    fontSize: 13.5,
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 20,
  },
  verMais: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 6,
    fontWeight: "500",
  },
});
