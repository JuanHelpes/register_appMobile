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
      <Stack.Screen
        name="eventosCompartilhados"
        options={{ title: "Eventos compartilhados" }}
      />
      <Stack.Screen
        name="visualizarEvento"
        options={{
          title: "Visualizar Evento",
          headerShown: true,
          headerTintColor: "#00ADB5",
        }}
      />
      <Stack.Screen
        name="registrarPresenca"
        options={{
          title: "Registrar Presença",
          headerShown: true,
          headerTintColor: "#00ADB5",
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: "Registrar Presença",
          headerShown: true,
          headerTintColor: "#00ADB5",
        }}
      />
    </Stack>
  );
}
