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
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { listContents, ContentItem } from "@/services/contents";
import { useSession } from "@/hooks/useSession";
import { useLogout } from "@/hooks/useLogout";
import AtalhoCard from "@/components/AtalhoCard"; // ✅ usa o componente pronto

type Atalho = {
  label: string;
  icon: any;
  to: string;
  color: string;
};

export default function Home() {
  const router = useRouter();
  const { data: session, isLoading: loadingSession } = useSession();
  const logout = useLogout();

  const { data: conteudos, isLoading } = useQuery<ContentItem[]>({
    queryKey: ["conteudos"],
    queryFn: () => listContents(),
  });

  const primeiroNome = useMemo(() => {
    if (!session?.name) return "Usuário";
    return session.name.split(" ")[0];
  }, [session]);

  const atalhos: Atalho[] = [
    {
      label: "Plano de Aula",
      icon: "book",
      to: "/plano-aula",
      color: "#3B82F6",
    },
    {
      label: "Atividades",
      icon: "game-controller",
      to: "/atividades",
      color: "#F59E0B",
    },
    { label: "Histórias", icon: "library", to: "/historias", color: "#EF4444" },
    {
      label: "Criação de Provas",
      icon: "document-text",
      to: "/provas",
      color: "#10B981",
    },
    {
      label: "Sugestões de Projetos",
      icon: "bulb",
      to: "/projetos",
      color: "#8B5CF6",
    },
    {
      label: "Jogos Educativos",
      icon: "game-controller",
      to: "/jogos",
      color: "#EC4899",
    },
    {
      label: "Recursos Inclusivos",
      icon: "accessibility",
      to: "/inclusao",
      color: "#0284C7",
    },
    {
      label: "Planejamento Semanal",
      icon: "calendar",
      to: "/planejamento",
      color: "#CA8A04",
    },
    {
      label: "Materiais de Apoio",
      icon: "folder",
      to: "/materiais",
      color: "#DB2777",
    },
  ];

  function renderConteudo({ item }: { item: ContentItem }) {
    return (
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardEmoji}>{item.emoji ?? "📘"}</Text>
          <Text style={styles.cardCategoria}>{item.category}</Text>
        </View>
        <Text style={styles.cardTitulo}>{item.title}</Text>
        <Text style={styles.cardDescricao}>{item.body}</Text>
      </Pressable>
    );
  }

  if (loadingSession || isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.safe,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator />
        <Text style={{ marginTop: 8, color: "#6B7280" }}>
          Carregando dados...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.boasVindas}>Olá, {primeiroNome} </Text>
                <Text style={styles.subBoasVindas}>
                  O que vamos preparar hoje?
                </Text>
              </View>

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

            <View style={styles.atalhosContainer}>
              {atalhos.map((a) => (
                <AtalhoCard
                  key={a.label}
                  label={a.label}
                  icon={a.icon}
                  to={a.to as any}
                  color={a.color}
                />
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitulo}>Últimos conteúdos</Text>
              <Pressable onPress={() => router.push("/conteudos")}>
                <Text style={styles.verTodos}>Ver todos</Text>
              </Pressable>
            </View>
          </>
        }
        data={conteudos ?? []}
        keyExtractor={(i) => String(i.id)}
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
