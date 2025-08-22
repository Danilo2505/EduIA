import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useRouter, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Atalho = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  to: Href;
  color?: string; // cor opcional para o fundo
};

export default function AtalhoCard({
  label,
  icon,
  to,
  color = "#2563EB",
}: Atalho) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(to)}
      style={({ pressed }) => [
        styles.atalho,
        { transform: [{ scale: pressed ? 0.96 : 1 }] },
      ]}
    >
      <View style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.iconWrapper}>
          <Ionicons name={icon} size={26} color="#fff" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  atalho: {
    width: "30%",
    marginBottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  container: {
    minHeight: 110,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  label: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 16,
  },
});
