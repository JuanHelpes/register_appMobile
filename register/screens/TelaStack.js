//não está sendo usada.
const HomeStack = createNativeStackNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Button } from 'react-native';

export function TelaStack() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Item" component={Item}  />
        <HomeStack.Screen name="Detalhe" component={Detalhe}  />
      </HomeStack.Navigator>
);
}

function Item({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Item</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => {
          navigation.navigate('Detalhe', {
            itemId: 86,
            otherParam: 'outros parametros',
          });
        }}
      />
    </View>
  );
}

function Detalhe({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detalhe</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Ir para detalhes novamente"
        onPress={() =>
          navigation.push('Detalhes', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Ir para Tela1" onPress={() => navigation.navigate('Item')} />
      <Button title="Ir para TelaTab" onPress={() => navigation.navigate('TelaTab', {})} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}