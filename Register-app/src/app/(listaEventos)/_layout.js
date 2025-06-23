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
        name="eventos"
        options={{
          title: "Registrar Presença",
        }}
      />
      <Stack.Screen
        name="addOrganizadores"
        options={{
          title: "Adicionar organizadores",
          headerShown: true,
          headerTintColor: "#00ADB5",
        }}
      />
      <Stack.Screen
        name="editaEvento"
        options={{
          title: "Editar evento",
          headerShown: true,
          headerTintColor: "#00ADB5",
        }}
      />
    </Stack>
  );
}
