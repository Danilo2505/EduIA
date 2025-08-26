import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import Header from "@/components/Header";
import AtalhosGrid from "@/components/AtalhoCard";
import ContentsCard from "@/components/ContentsCard";
import { listContents, ContentItem } from "@/services/contents";

export default function Home() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await listContents();
      setContents(data);
    }
    fetchData();
  }, []);

  // 🔎 filtro simples pelo título ou body
  const filteredContents = contents.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Header />
      <AtalhosGrid />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔎 Minhas atividades</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite para pesquisar..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.lista}>
          {filteredContents.map((item) => (
            <ContentsCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F3F4F6" },
  section: { marginBottom: 1 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  lista: { marginTop: 12 },
});
