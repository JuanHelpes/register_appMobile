import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        headerStyle: {
          backgroundColor: "#C4C4C4",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Usuario" }} />
      <Stack.Screen
        name="editaUser"
        options={{
          title: "Editar Usuario",
          headerShown: true,
          headerTintColor: "#00ADB5",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
}
