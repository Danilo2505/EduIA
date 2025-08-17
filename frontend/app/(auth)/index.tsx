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
import { useRouter } from "expo-router";
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const nomeOk = nome.trim().length >= 2;

  // força simples: +1 por cada critério atendido
  const senhaLen = senha.length >= 6;
  const senhaUpper = /[A-Z]/.test(senha);
  const senhaDigit = /\d/.test(senha);
  const senhaSpecial = /[^A-Za-z0-9]/.test(senha);
  const forca = [senhaLen, senhaUpper, senhaDigit, senhaSpecial].filter(
    Boolean
  ).length;

  const senhaOk = forca >= 3; // ajuste se quiser exigir 4/4
  const confirmaOk = confirmarSenha.length > 0 && senha === confirmarSenha;

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

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
          />
          {!nomeOk && nome.length > 0 && (
            <Text style={styles.helper}>Mínimo de 2 caracteres.</Text>
          )}

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

          {/* Senha */}
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
              autoCapitalize="none"
              autoComplete="password-new"
              returnKeyType="next"
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

          {/* Barra de força da senha */}
          {senha.length > 0 && (
            <View style={styles.strengthWrap}>
              <View
                style={[
                  styles.strengthBar,
                  forca >= 1 && { backgroundColor: "#F59E0B" },
                ]}
              />
              <View
                style={[
                  styles.strengthBar,
                  forca >= 2 && { backgroundColor: "#F59E0B" },
                ]}
              />
              <View
                style={[
                  styles.strengthBar,
                  forca >= 3 && { backgroundColor: "#10B981" },
                ]}
              />
              <View
                style={[
                  styles.strengthBar,
                  forca >= 4 && { backgroundColor: "#10B981" },
                ]}
              />
            </View>
          )}
          {senha.length > 0 && (
            <Text style={styles.strengthHint}>
              Dica: use 6+ caracteres com maiúscula, número e símbolo.
            </Text>
          )}

          {/* Confirmar senha */}
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              secureTextEntry={!mostrarConfirmar}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />
            <TouchableOpacity
              style={styles.toggle}
              onPress={() => setMostrarConfirmar((v) => !v)}
              hitSlop={10}
            >
              <Text style={styles.toggleText}>
                {mostrarConfirmar ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>
          {!confirmaOk && confirmarSenha.length > 0 && (
            <Text style={styles.helper}>As senhas não coincidem.</Text>
          )}

          {/* Termos */}
          <View style={styles.termsRow}>
            <TouchableOpacity
              onPress={() => setAceitouTermos((v) => !v)}
              style={[styles.checkbox, aceitouTermos && styles.checkboxOn]}
            >
              {aceitouTermos && <Text style={{ fontWeight: "900" }}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              Li e aceito os{" "}
              <Text
                style={styles.linkInline}
                onPress={() => router.push("/termos")}
              >
                Termos de Uso
              </Text>{" "}
              e a{" "}
              <Text
                style={styles.linkInline}
                onPress={() => router.push("/privacidade")}
              >
                Política de Privacidade
              </Text>
              .
            </Text>
          </View>

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
              Já tem conta? <Text style={{ fontWeight: "800" }}>Entrar</Text>
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
  toggle: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  toggleText: { color: "#2563EB", fontWeight: "600" },
  strengthWrap: {
    flexDirection: "row",
    gap: 6,
    marginTop: -4,
    marginBottom: 8,
  },
  strengthBar: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  strengthHint: { fontSize: 12, color: "#6B7280", marginBottom: 8 },
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
  termsText: { flex: 1, color: "#374151", fontSize: 12 },
  linkInline: { color: "#2563EB", fontWeight: "600" },
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
  socialText: { color: "#111827", fontWeight: "700" },
  linkCenter: { textAlign: "center", color: "#2563EB" },
});
