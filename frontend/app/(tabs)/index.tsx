import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter, Href } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { useSession } from "@/hooks/useSession";
import { useLogout } from "@/hooks/useLogout";

type Conteudo = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: "Plano de Aula" | "Atividade" | "História";
  emoji: string;
};

const MOCK_CONTEUDOS: Conteudo[] = [
  {
    id: "1",
    titulo: "Plano de Aula - Matemática",
    descricao: "Adição e subtração com jogos educativos",
    categoria: "Plano de Aula",
    emoji: "📚",
  },
  {
    id: "2",
    titulo: "História - A Galinha dos Ovos de Ouro",
    descricao: "História infantil com moral educativa",
    categoria: "História",
    emoji: "📖",
  },
];

type Atalho = {
  label: string;
  emoji: string;
  to: Href;
  gradient: [string, string];
};

export default function Home() {
  const router = useRouter();
  const { data: session, isLoading } = useSession();
  const logout = useLogout();

  const primeiroNome = useMemo(() => {
    if (!session?.name) return "Usuário";
    return session.name.split(" ")[0];
  }, [session]);

  const atalhos: Atalho[] = [
    {
      label: "Plano de Aula",
      emoji: "📚",
      to: "/plano-aula",
      gradient: ["#6EE7F9", "#3B82F6"],
    },
    {
      label: "Atividades",
      emoji: "🎲",
      to: "/atividades",
      gradient: ["#FDE68A", "#F59E0B"],
    },
    {
      label: "Histórias",
      emoji: "📖",
      to: "/historias",
      gradient: ["#FCA5A5", "#EF4444"],
    },
    {
      label: "Criação de Provas",
      emoji: "📝",
      to: "/provas",
      gradient: ["#A7F3D0", "#10B981"],
    },
    {
      label: "Sugestões de Projetos",
      emoji: "💡",
      to: "/projetos",
      gradient: ["#DDD6FE", "#8B5CF6"],
    },
    {
      label: "Jogos Educativos",
      emoji: "🎮",
      to: "/jogos",
      gradient: ["#FBCFE8", "#EC4899"],
    },
    {
      label: "Recursos Inclusivos",
      emoji: "♿",
      to: "/inclusao",
      gradient: ["#E0F2FE", "#0284C7"],
    },
    {
      label: "Planejamento Semanal",
      emoji: "🗓️",
      to: "/planejamento",
      gradient: ["#FDE68A", "#CA8A04"],
    },
    {
      label: "Materiais de Apoio",
      emoji: "📂",
      to: "/materiais",
      gradient: ["#FBCFE8", "#DB2777"],
    },
  ];

  function renderAtalho(a: Atalho) {
    return (
      <Pressable
        key={a.label}
        onPress={() => router.push(a.to)}
        style={({ pressed }) => [
          styles.atalho,
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
        ]}
      >
        <LinearGradient colors={a.gradient} style={styles.atalhoGradient}>
          <Text style={styles.atalhoEmoji}>{a.emoji}</Text>
          <Text style={styles.atalhoTexto}>{a.label}</Text>
        </LinearGradient>
      </Pressable>
    );
  }
  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.safe,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator />
        <Text style={{ marginTop: 8, color: "#6B7280" }}>
          Carregando sessão...
        </Text>
      </SafeAreaView>
    );
  }
  function renderConteudo({ item }: { item: Conteudo }) {
    return (
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{item.emoji}</Text>
          <Text style={styles.cardCategoria}>{item.categoria}</Text>
        </View>
        <Text style={styles.cardTitulo}>{item.titulo}</Text>
        <Text style={styles.cardDescricao}>{item.descricao}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            {/* Cabeçalho */}
            <View style={styles.header}>
              <View>
                <Text style={styles.boasVindas}>Olá, {primeiroNome} 👋</Text>
                <Text style={styles.subBoasVindas}>
                  O que vamos preparar hoje?
                </Text>
              </View>

              {/* Avatar + Logout */}
              <View style={{ alignItems: "center" }}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarTexto}>
                    {primeiroNome?.[0]?.toUpperCase()}
                  </Text>
                </View>
                <Pressable
                  onPress={async () => {
                    await logout();
                    router.replace("/login");
                  }}
                  style={{ marginTop: 6 }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#EF4444",
                      fontWeight: "600",
                    }}
                  >
                    Sair
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Atalhos rápidos */}
            <View style={styles.atalhosContainer}>
              {atalhos.map(renderAtalho)}
            </View>

            {/* Título seção */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitulo}>Últimos conteúdos</Text>
              <Pressable onPress={() => router.push("/conteudos/index")}>
                <Text style={styles.verTodos}>Ver todos</Text>
              </Pressable>
            </View>
          </>
        }
        data={MOCK_CONTEUDOS}
        keyExtractor={(i) => i.id}
        renderItem={renderConteudo}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyTitulo}>Nada por aqui ainda</Text>
            <Text style={styles.emptyDescricao}>
              Crie seu primeiro plano de aula, atividade ou história usando os
              atalhos acima.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F7FA" },
  container: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  boasVindas: { fontSize: 22, fontWeight: "700", color: "#1F2937" },
  subBoasVindas: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTexto: { fontSize: 16, fontWeight: "700", color: "#374151" },
  atalhosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  atalho: {
    width: "30%",
    marginBottom: 12,
    borderRadius: 14,
    overflow: "hidden",
  },
  atalhoGradient: {
    minHeight: 100,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  atalhoEmoji: { fontSize: 26, marginBottom: 6 },
  atalhoTexto: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 16,
    flexShrink: 1,
  },
  sectionHeader: {
    marginTop: 6,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitulo: { fontSize: 16, fontWeight: "700", color: "#111827" },
  verTodos: { fontSize: 13, color: "#2563EB", fontWeight: "600" },
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
  empty: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    marginTop: 8,
  },
  emptyEmoji: { fontSize: 28, marginBottom: 8 },
  emptyTitulo: { fontSize: 16, fontWeight: "700", color: "#111827" },
  emptyDescricao: {
    fontSize: 13.5,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
});
