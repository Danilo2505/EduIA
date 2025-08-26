import { useState } from "react";
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
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isConfirmedPassword,
  passwordStrength,
} from "@/utils/validations";

import { useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import { useRegisterMutation } from "@/hooks/useAuth";

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const { mutateAsync: doRegister, isPending } = useRegisterMutation({
    onSuccess: () => {
      Alert.alert("Conta criada!", "Faça login para continuar.");
      router.replace({ pathname: "/login", params: { email } });
    },
    onError: (e: any) => {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Tente novamente em instantes.";
      Alert.alert("Falha no registro", msg);
    },
  });

  const emailOk = isValidEmail(email);
  const nomeOk = isValidName(nome);
  const senhaOk = isValidPassword(senha);
  const confirmaOk = isConfirmedPassword(senha, confirmarSenha);

  const podeEnviar =
    nomeOk && emailOk && senhaOk && confirmaOk && aceitouTermos && !isPending;

  async function onSubmit() {
    if (!podeEnviar) return;
    await doRegister({
      name: nome.trim(),
      email: email.trim(),
      password: senha,
    });
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
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Cadastre-se para começar a usar o app.
          </Text>

          <FormInput
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
            error={
              !nomeOk && nome.length > 0 ? "Mínimo de 2 caracteres." : undefined
            }
          />

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
            autoComplete="password-new"
            returnKeyType="next"
          />

          <PasswordInput
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            error={
              !confirmaOk && confirmarSenha.length > 0
                ? "As senhas não coincidem."
                : undefined
            }
          />

          <TouchableOpacity
            style={[styles.button, !podeEnviar && { opacity: 0.6 }]}
            onPress={onSubmit}
            disabled={!podeEnviar}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login")}
            style={{ marginTop: 16 }}
          >
            <Text style={styles.linkCenter}>
              Já tem conta?{" "}
              <Text style={{ fontWeight: "800", color: "#2563EB" }}>
                Entrar
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
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxOn: {
    backgroundColor: "#D1FAE5",
    borderColor: "#10B981",
  },
  termsText: {
    flex: 1,
    color: "#374151",
    fontSize: 12,
  },
  linkInline: {
    color: "#2563EB",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#10B981",
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
