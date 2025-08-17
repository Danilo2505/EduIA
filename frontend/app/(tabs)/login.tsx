import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLoginMutation } from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { mutateAsync: doLogin, isPending } = useLoginMutation({
    onSuccess: () => router.replace("/home"),
    onError: (e: any) =>
      Alert.alert(
        "Falha no login",
        e?.response?.data?.message || e?.message || "Tente novamente."
      ),
  });

  useEffect(() => {
    if (params?.email && typeof params.email === "string") {
      setEmail(params.email);
    }
  }, [params?.email]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const senhaOk = senha.length >= 6;
  const podeEnviar = emailOk && senhaOk && !isPending;

  async function onSubmit() {
    if (!podeEnviar) return;
    await doLogin({ email: email.trim(), password: senha });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F3F4F6" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.center}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>
            Bem-vindo de volta! Acesse sua conta.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="next"
          />
          {!emailOk && email.length > 0 && (
            <Text style={styles.helper}>Informe um e-mail válido.</Text>
          )}

          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />
            <TouchableOpacity
              style={styles.toggle}
              onPress={() => setMostrarSenha((v) => !v)}
              hitSlop={10}
            >
              <Text style={styles.toggleText}>
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>
          {!senhaOk && senha.length > 0 && (
            <Text style={styles.helper}>Mínimo de 6 caracteres.</Text>
          )}

          <View style={styles.actionsRow}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => router.push("/recuperar-senha")}>
              <Text style={styles.linkInline}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.buttonPrimary, !podeEnviar && { opacity: 0.6 }]}
            onPress={onSubmit}
            disabled={!podeEnviar}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/")}
            style={{ marginTop: 16 }}
          >
            <Text style={styles.linkCenter}>
              Não tem conta?{" "}
              <Text style={{ fontWeight: "800" }}>Registrar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  helper: { fontSize: 12, color: "#EF4444", marginTop: -6, marginBottom: 8 },
  toggle: { position: "absolute", right: 12, top: 12 },
  toggleText: { color: "#2563EB", fontWeight: "600" },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  buttonPrimary: {
    backgroundColor: "#2563EB", // azul pro login (no register era verde)
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
  },

  linkCenter: { textAlign: "center", color: "#2563EB" },
  linkInline: { color: "#2563EB", fontWeight: "600" },
});
