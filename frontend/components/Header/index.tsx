// components/Header.tsx
import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/hooks/useSession";
import { useLogout } from "@/hooks/useLogout";

type Props = {
  nome?: string;
};

export default function Header({ nome }: Props) {
  const router = useRouter();
  const { data: session, isLoading: loadingSession } = useSession();
  const logout = useLogout();

  const primeiroNome = useMemo(() => {
    const nomeUsuario = nome ?? session?.name;
    if (!nomeUsuario) return "Usuário";
    return nomeUsuario.split(" ")[0];
  }, [nome, session]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <Text style={styles.boasVindas}>Olá, {primeiroNome}</Text>
          <Text style={styles.subBoasVindas}>O que vamos preparar hoje?</Text>
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
              router.replace("/(auth)");
            }}
            style={styles.botaoSair}
          >
            <Text style={styles.sair}>Sair</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  sair: {
    fontSize: 12,
    color: "#FFFFFF", // texto branco
    fontWeight: "600",
  },

  botaoSair: {
    marginTop: 6,
    backgroundColor: "#EF4444", // vermelho
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
