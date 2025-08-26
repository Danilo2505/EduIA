import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TextInputProps,
} from "react-native";

type Props = TextInputProps & {
  error?: string;
};

export default function FormInput({ error, style, ...props }: Props) {
  return (
    <View style={{ width: "100%" }}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
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
  helper: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: -6,
    marginBottom: 8,
  },
});
