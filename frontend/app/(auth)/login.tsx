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
import { isValidEmail, isValidPassword } from "@/utils/validations";

import { useLocalSearchParams, useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import { useLoginMutation } from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { mutateAsync: doLogin, isPending } = useLoginMutation({
    onSuccess: () => router.replace("/(tabs)"),
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

          <FormInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="next"
            error={
              !emailOk && email.length > 0
                ? "Informe um e-mail válido."
                : undefined
            }
          />

          <PasswordInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            autoCapitalize="none"
            autoComplete="password"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            error={
              !senhaOk && senha.length > 0
                ? "Mínimo de 6 caracteres."
                : undefined
            }
          />

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
              <Text style={{ fontWeight: "800", color: "#2563EB" }}>
                Registrar
              </Text>
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
  buttonPrimary: {
    backgroundColor: "#2563EB", // azul pro login
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  linkCenter: {
    textAlign: "center",
  },
});
