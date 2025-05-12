import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { styles } from '../styles/style';

export function TelaRegistro({ navigation }) {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setconfirmarSenha] = useState('');
  const [menssagem, setMenssagem] = useState('');

  function registro() {
    if (senha != confirmarSenha) setMenssagem('Senhas não batem!');
    else {
      var userObj = { nome: nome, email: email, senha: senha };
      var jsonBody = JSON.stringify(userObj);
      navigation.navigate('TelaLoading');

      fetch(
        'https://juanhelpes-registrador-de-presenca.glitch.me/CriaUsuario',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: jsonBody,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.affectedRows > 0) {
            alert('Usuario Cadastrado!');
            navigation.navigate('TelaLogin')
          }
          else setMenssagem('Erro!');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/marca/logo_transparent.png')}
        />
        <View style={styles.form}>
          <TextInput
            style={styles.inputForm}
            placeholder="Nome"
            autoCapitalize="none"
            autoCorrect={true}
            onChangeText={(event) => setNome(event)}
          />
          <TextInput
            style={styles.inputForm}
            placeholder="Email"
            autoCompleteType="email"
            autoCapitalize="none"
            autoCorrect={true}
            onChangeText={(event) => setEmail(event)}
          />
          <TextInput
            style={styles.inputForm}
            placeholder="Senha"
            autoCompleteType="current-password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(event) => setSenha(event)}
          />
          <TextInput
            style={styles.inputForm}
            placeholder="Confirmar Senha"
            autoCompleteType="current-password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(event) => setconfirmarSenha(event)}
          />
          <TouchableOpacity
            style={styles.buttonForm}
            onPress={() => registro()}>
            <Text style={styles.textButton}>Registrar</Text>
          </TouchableOpacity>
          <Text style={styles.textAlert}>{menssagem}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
