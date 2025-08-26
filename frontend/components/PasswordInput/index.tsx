// components/PasswordInput.tsx
import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInputProps,
} from "react-native";

type Props = TextInputProps & {
  error?: string;
};

export default function PasswordInput({ error, style, ...props }: Props) {
  const [show, setShow] = useState(false);

  return (
    <View style={{ position: "relative", width: "100%" }}>
      <TextInput
        style={[styles.input, style]}
        secureTextEntry={!show}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => setShow((v) => !v)}
        hitSlop={10}
      >
        <Text style={styles.toggleText}>{show ? "Ocultar" : "Mostrar"}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.helper}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
  toggleText: { color: "#2563EB", fontWeight: "600" },
  helper: { fontSize: 12, color: "#EF4444", marginTop: -6, marginBottom: 8 },
});
