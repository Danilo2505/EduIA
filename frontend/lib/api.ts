import { Platform } from "react-native";

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === "android"
    ? "http://192.168.1.10:3333"
    : "http://192.168.1.10:3333");
