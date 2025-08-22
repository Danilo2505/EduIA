import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Atalho = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  to: string;
};

const atalhos: Atalho[] = [
  {
    label: "Plano de Aula",
    icon: "book-outline",
    color: "#2563EB",
    to: "/plano-aula",
  },
  {
    label: "Atividades",
    icon: "create-outline",
    color: "#F59E0B",
    to: "/atividades",
  },
  {
    label: "Histórias",
    icon: "library-outline",
    color: "#EF4444",
    to: "/historias",
  },
  {
    label: "Criação de Provas",
    icon: "document-text-outline",
    color: "#10B981",
    to: "/provas",
  },
  {
    label: "Projetos",
    icon: "bulb-outline",
    color: "#8B5CF6",
    to: "/projetos",
  },
  {
    label: "Jogos Educativos",
    icon: "game-controller-outline",
    color: "#EC4899",
    to: "/jogos",
  },
  {
    label: "Inclusivos",
    icon: "accessibility-outline",
    color: "#06B6D4",
    to: "/inclusao",
  },
  {
    label: "Planejamento",
    icon: "calendar-outline",
    color: "#D97706",
    to: "/planejamento",
  },
  {
    label: "Materiais",
    icon: "folder-outline",
    color: "#7C3AED",
    to: "/materiais",
  },
];

export default function AtalhosGrid() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Atalho }) => (
    <Pressable
      style={[styles.card, { backgroundColor: item.color }]}
      android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      onPress={() => router.push(item.to as any)}
    >
      <Ionicons name={item.icon} size={28} color="#fff" />
      <Text style={styles.label}>{item.label}</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={atalhos}
      renderItem={renderItem}
      keyExtractor={(item) => item.to}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginTop: 6,
    textAlign: "center",
  },
});
