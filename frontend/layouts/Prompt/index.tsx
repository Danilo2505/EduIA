// layouts/Prompt/index.tsx
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

import { useAIGenerate } from "@/hooks/useAI";
import { createContent } from "@/services/contents";

function limparMarkdown(texto: string) {
  let contador = 1;

  return texto
    .replace(/^#{1,6}\s?/gm, "") // títulos (#, ##, ###)
    .replace(/\*\*(.*?)\*\*/g, "$1") // negrito **
    .replace(/\*(.*?)\*/g, "$1") // itálico *
    .replace(/_{1,3}(.*?)_{1,3}/g, "$1") // underline com _
    .replace(/`{1,3}(.*?)`{1,3}/g, "$1") // inline code
    .replace(/^-{3,}$/gm, "") // linhas ---
    .replace(/^\s*-\s+/gm, () => `• `) // listas com - → bolinha
    .replace(/^\s*\*\s+/gm, () => `• `) // listas com * → bolinha
    .replace(/^\s*\d+\.\s+/gm, () => `${contador++}. `) // listas numeradas
    .replace(/>\s?/g, "") // blockquote >
    .trim();
}

type Category =
  | "PLANO_AULA"
  | "ATIVIDADE"
  | "HISTORIA"
  | "PROVA"
  | "PROJETO"
  | "JOGO"
  | "INCLUSAO"
  | "PLANEJAMENTO"
  | "MATERIAL";

export default function Prompt({
  titulo,
  placeholder,
  destinoLista,
  prefixoResultado,
  category,
}: {
  titulo: string;
  placeholder: string;
  destinoLista: Href;
  prefixoResultado: string;
  category: Category;
}) {
  const router = useRouter();
  const [tituloItem, setTituloItem] = useState("");
  const [prompt, setPrompt] = useState("");
  const [resposta, setResposta] = useState("");

  const { mutateAsync: gerarIA, isPending } = useAIGenerate({
    onError: (e: any) =>
      Alert.alert(
        "Erro",
        e?.response?.data?.error || e?.message || "Falha ao gerar."
      ),
  });

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
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background-color: #fdfdfd;
              color: #333;
            }
            h1 {
              text-align: center;
              color: #2563EB;
              margin-bottom: 30px;
              font-size: 24px;
            }
            p {
              line-height: 1.6;
              font-size: 15px;
              margin: 8px 0;
              white-space: pre-wrap;
            }
            .box {
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 10px;
              padding: 20px;
              margin-bottom: 20px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.08);
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <h1>${tituloItem || titulo}</h1>
          <div class="box">
            <p>${limparMarkdown(resposta)}</p>
          </div>
          
        </body>
      </html>
    `;
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });
    } catch {
      Alert.alert("Erro", "Não foi possível gerar o PDF.");
    }
  }

  async function gerar() {
    if (!prompt.trim() || !tituloItem.trim()) {
      Alert.alert("Preencha o título e o conteúdo antes de gerar.");
      return;
    }
    const texto = await gerarIA(`${prefixoResultado}\n\n${prompt}`.trim());
    setResposta(limparMarkdown(texto || ""));
  }

  async function salvar() {
    if (!resposta) return;

    try {
      await createContent({
        title: tituloItem.trim(),
        body: resposta,
        category,
        tag: "IA",
        emoji: "🧠",
      });

      router.push(destinoLista as any);
    } catch (e: any) {
      Alert.alert(
        "Erro",
        e?.response?.data?.error || "Não foi possível salvar."
      );
    }
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
        {/* Título */}
        <TextInput
          style={s.input}
          placeholder="Digite um título para este conteúdo..."
          value={tituloItem}
          onChangeText={setTituloItem}
        />

        {/* Prompt */}
        <TextInput
          style={s.input}
          placeholder={placeholder}
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />

        {/* Gerar */}
        <Pressable
          style={[s.btn, isPending && { opacity: 0.7 }]}
          onPress={gerar}
          disabled={isPending}
        >
          <Text style={s.btnText}>{isPending ? "Gerando..." : "Gerar"}</Text>
        </Pressable>

        {/* Resultado */}
        {!!resposta && (
          <View style={s.result}>
            <Text style={s.resultTitle}>{tituloItem}</Text>

            <Text style={{ color: "#6B7280", marginBottom: 8 }}>
              {prefixoResultado}
            </Text>

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
  backBtn: { marginRight: 8, padding: 6 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#111" },
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
  actionsRow: { flexDirection: "row", marginBottom: 12, gap: 12 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionText: { color: "#2563EB", fontWeight: "600", marginLeft: 6 },
  saveBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "800" },
});
