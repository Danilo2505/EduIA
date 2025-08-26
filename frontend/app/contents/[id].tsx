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
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { PDF } from "@/utils/PDF";
import { getContentById, ContentItem } from "@/services/contents";
import { limparMarkdown } from "@/utils/Markdown";

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

  async function copiar() {
    if (!item) return;
    const texto = `${item.emoji ?? ""} ${item.tag ?? ""}\n\n${
      item.title
    }\n\n${limparMarkdown(item.body ?? "")}`;
    await Clipboard.setStringAsync(texto.trim());
    Alert.alert(
      "Copiado!",
      "O conteúdo foi copiado para a área de transferência."
    );
  }

  async function baixarPDF() {
    if (!item) return;
    await PDF(item.title, item.body ?? "");
  }

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
      {/* Header fixo */}
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

      {/* Card com scroll interno */}
      <View style={s.cardWrapper}>
        <ScrollView contentContainerStyle={{ padding: 18 }}>
          <View style={s.cardHeader}>
            {!!item.emoji && <Text style={s.cardEmoji}>{item.emoji}</Text>}
            {!!item.tag && <Text style={s.cardTag}>{item.tag}</Text>}
          </View>

          <Text style={s.cardTitle}>{item.title}</Text>
          {!!item.body && (
            <Text style={s.cardBody}>{limparMarkdown(item.body)}</Text>
          )}

          <Text style={s.date}>
            Criado em {new Date(item.created_at).toLocaleDateString("pt-BR")}
          </Text>
        </ScrollView>
      </View>

      {/* Botões fixos no rodapé */}
      <View style={s.footer}>
        <Pressable style={s.footerBtn} onPress={copiar}>
          <Ionicons name="copy-outline" size={20} color="#fff" />
          <Text style={s.footerBtnText}>Copiar</Text>
        </Pressable>
        <Pressable style={s.footerBtn} onPress={baixarPDF}>
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={s.footerBtnText}>PDF</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7FA" },
  loading: { marginTop: 12, textAlign: "center", color: "#6B7280" },
  cardWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 80,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
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

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 6,
    justifyContent: "center",
  },
  footerBtnText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});
