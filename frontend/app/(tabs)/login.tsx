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
    onError: (e) =>
      Alert.alert("Falha no login", e.message || "Tente novamente."),
  });

  useEffect(() => {
    if (params?.email && typeof params.email === "string") {
      setEmail(params.email);
    }
  }, [params?.email]);

  const emailOk = email.includes("@");
  const senhaOk = senha.length >= 6;
  const podeEnviar = emailOk && senhaOk && !isPending;

  async function onSubmit() {
    if (!podeEnviar) return;
    await doLogin({ email: email.trim(), password: senha });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F7F7FA" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />

        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
            autoComplete="password"
          />
          <TouchableOpacity
            style={styles.toggle}
            onPress={() => setMostrarSenha((v) => !v)}
            hitSlop={10}
          >
            <Text style={{ color: "#2563EB", fontWeight: "600" }}>
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, !podeEnviar && { opacity: 0.6 }]}
          onPress={onSubmit}
          disabled={!podeEnviar}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.link}>
            Não tem conta? <Text style={{ fontWeight: "800" }}>Registrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
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
  toggle: { position: "absolute", right: 12, top: 12 },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  link: { marginTop: 8, textAlign: "center", color: "#2563EB" },
});
