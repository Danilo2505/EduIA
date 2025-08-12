import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 🔹 Remove o header em TODAS as tabs
        tabBarActiveTintColor: "#007AFF", // azul estilo iOS
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Registrar",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="sign-in" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
