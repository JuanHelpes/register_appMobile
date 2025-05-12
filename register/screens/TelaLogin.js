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
import {setToken, setId} from '../Rotes/Autentica'

export function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [menssagem, setMenssagem] = useState('');

  function verificarLogin() {
    var userObj = { email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);

    navigation.navigate('TelaLoading', {});

    fetch('https://juanhelpes-registrador-de-presenca.glitch.me/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.headers)
      .then((data) => {
        const token = data.get('x-access-token');
        const usu_id = data.get('usu_id');
        if (token){
          setToken(token)
          setId(usu_id)
          setEmail('')
          setSenha('')
          navigation.navigate('TelaTab', {});
        } 
        else{
        navigation.navigate('TelaLogin', {}); 
        setMenssagem('Email ou senha inválidos!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            placeholder="Email"
            value = {email}
            autoCompleteType="email"
            autoCapitalize="none"
            autoCorrect={true}
            onChangeText={(event) => setEmail(event)}
          />
          <TextInput
            style={styles.inputForm}
            placeholder="Senha"
            value = {senha}
            autoCompleteType="current-password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(event) => setSenha(event)}
          />
          <TouchableOpacity
            style={styles.buttonForm}
            onPress={() => verificarLogin()}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TelaRegistro', {})}>
            <Text style={styles.textButton}>Registrar agora!</Text>
          </TouchableOpacity>
          <Text style={styles.textAlert}>{menssagem}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
