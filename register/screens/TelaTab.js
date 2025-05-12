import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import { TelaCriarEvento } from './TelaCriarEvento';
import { TelaEventos } from './TelaEventos';
import { TelaEventosCompartilhados } from './TelaEventosCompartilhados';
import { TelaUsuario } from './TelaUsuario';

import { Ionicons } from '@expo/vector-icons';

export function TelaTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#696969',
          botton: 30,
          left: 14,
          right: 14,
          borderRadius: 30,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="TelaCriarEvento"
        component={TelaCriarEvento}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="add-circle" size={size} color={'#00ADB5'} />
              );
            }
            return <Ionicons name="add-circle" size={size} color={'#FFFFFF'} />;
          },
        }}
      />
      <Tab.Screen
        name="TelaEventos"
        component={TelaEventos}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                  name="list-circle-outline"
                  size={size}
                  color={'#00ADB5'}
                />
              );
            }
            return (
              <Ionicons
                name="list-circle-outline"
                size={size}
                color={'#FFFFFF'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="TelaEventosCompartilhados"
        component={TelaEventosCompartilhados}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                  name="share-social-outline"
                  size={size}
                  color={'#00ADB5'}
                />
              );
            }
            return (
              <Ionicons
                name="share-social-outline"
                size={size}
                color={'#FFFFFF'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="TelaUsuario"
        component={TelaUsuario}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                  name="person"
                  size={size}
                  color={'#00ADB5'}
                />
              );
            }
            return (
              <Ionicons
                name="person"
                size={size}
                color={'#FFFFFF'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
