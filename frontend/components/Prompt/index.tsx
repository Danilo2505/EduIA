import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, Href } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function Prompt({
  titulo,
  placeholder,
  destinoLista,
  prefixoResultado,
}: {
  titulo: string;
  placeholder: string;
  destinoLista: Href;
  prefixoResultado: string;
}) {
  const router = useRouter();
  const [tituloItem, setTituloItem] = useState("");
  const [prompt, setPrompt] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  async function copiarResultado() {
    await Clipboard.setStringAsync(`${tituloItem}\n\n${resposta}`);
    Alert.alert(
      "Copiado!",
      "O resultado foi copiado para a área de transferência."
    );
  }

  async function baixarPDF() {
    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 20px;">
            <h2>${tituloItem || titulo}</h2>
            <pre style="white-space: pre-wrap; font-size: 14px;">${resposta}</pre>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o PDF.");
    }
  }

  function gerar() {
    if (!prompt.trim() || !tituloItem.trim()) {
      Alert.alert("Preencha o título e o conteúdo antes de gerar.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // remove o "Plano de aula gerado" daqui
      setResposta(`${prompt}\n\nEra uma vez...`);
      setLoading(false);
    }, 1200);
  }

  function salvar() {
    if (!resposta) return;
    router.push({
      pathname: destinoLista,
      params: { novoItem: `${tituloItem}\n\n${resposta}` },
    } as never);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FA" }}>
      {/* Header */}
      <View style={s.header}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </Pressable>
        <Text style={s.headerTitle}>{titulo}</Text>
      </View>

      <ScrollView contentContainerStyle={s.container}>
        {/* Campo de título */}
        <TextInput
          style={s.input}
          placeholder="Digite um título para este conteúdo..."
          value={tituloItem}
          onChangeText={setTituloItem}
        />

        {/* Campo de prompt */}
        <TextInput
          style={s.input}
          placeholder={placeholder}
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        {/* Botão Gerar */}
        <Pressable
          style={[s.btn, loading && { opacity: 0.7 }]}
          onPress={gerar}
          disabled={loading}
        >
          <Text style={s.btnText}>{loading ? "Gerando..." : "Gerar"}</Text>
        </Pressable>

        {/* Resultado */}
        {!!resposta && (
          <View style={s.result}>
            <Text style={s.resultTitle}>{tituloItem}</Text>

            {/* Mostra label apenas na tela */}
            <Text style={{ color: "#6B7280", marginBottom: 8 }}>
              📙 Plano de aula gerado:
            </Text>

            {/* Conteúdo real */}
            <Text style={s.resultText}>{resposta}</Text>

            <View style={s.actionsRow}>
              <Pressable style={s.actionBtn} onPress={copiarResultado}>
                <Ionicons name="copy-outline" size={18} color="#2563EB" />
                <Text style={s.actionText}>Copiar</Text>
              </Pressable>
              <Pressable style={s.actionBtn} onPress={baixarPDF}>
                <Ionicons name="download-outline" size={18} color="#2563EB" />
                <Text style={s.actionText}>PDF</Text>
              </Pressable>
            </View>

            <Pressable style={s.saveBtn} onPress={salvar}>
              <Text style={s.saveBtnText}>Salvar no histórico</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backBtn: {
    marginRight: 8,
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  container: { padding: 20, paddingTop: 16 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    minHeight: 50,
    fontSize: 14,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  result: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  resultTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  resultText: { fontSize: 14, color: "#444", marginBottom: 12, lineHeight: 20 },
  actionsRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionText: {
    color: "#2563EB",
    fontWeight: "600",
    marginLeft: 6,
  },
  saveBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "800" },
});
