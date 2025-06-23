import {} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TelaLogin } from "../screens/TelaLogin";
import { TelaRegistro } from "../screens/TelaRegistro";
import { TelaStack } from "../screens/TelaStack";
import { TelaTab } from "../screens/TelaTab";
import { TelaLoading } from "../screens/TelaLoading";
import { TelaVisualizarEvento } from "../screens/TelaVisualizarEvento";
import { TelaUsuario } from "../screens/TelaUsuario";
import { TelaEditaEvento } from "../screens/TelaEditaEvento";
import { TelaAddOrganizadores } from "../screens/TelaAddOrganizadores";
import { TelaRegistraPresenca } from "../screens/TelaRegistraPresenca";
import { TelaEditaUsuario } from "../screens/TelaEditaUsuario";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

export const setToken = async (token) => {
  await AsyncStorage.setItem("userToken", token);
};

export const setId = async (usu_id) => {
  await AsyncStorage.setItem("userId", usu_id);
};

export const clearToken = async () => {
  await AsyncStorage.clear();
  return true;
};

export const getToken = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  return userToken;
};

export const getId = async () => {
  const userId = await AsyncStorage.getItem("userId");
  return userId;
};

export function Autentica() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TelaLogin"
        component={TelaLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaRegistro"
        component={TelaRegistro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaStack"
        component={TelaStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaTab"
        component={TelaTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaVisualizarEvento"
        component={TelaVisualizarEvento}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaUsuario"
        component={TelaUsuario}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaEditaEvento"
        component={TelaEditaEvento}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaAddOrganizadores"
        component={TelaAddOrganizadores}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaRegistraPresenca"
        component={TelaRegistraPresenca}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaEditaUsuario"
        component={TelaEditaUsuario}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TelaLoading"
        component={TelaLoading}
        options={{
          headerShown: false,
          gestureEnable: true,
        }}
      />
    </Stack.Navigator>
  );
}
