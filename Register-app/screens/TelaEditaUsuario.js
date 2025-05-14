import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { styles } from '../styles/styleUsuario';
import { getToken, getId } from '../Rotes/Autentica';
import { useState, useEffect } from 'react';

export function TelaEditaUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setconfirmarSenha] = useState('');
  const [menssagem, setMenssagem] = useState('');

   async function editaUsuario() {
    const token = await getToken();
    const idUsuario = await getId();

    if (senha != confirmarSenha) setMenssagem('Senhas não batem!');
    else {
      var userObj = { nome: nome, email: email, senha: senha};
      var jsonBody = JSON.stringify(userObj);

      fetch('https://juanhelpes-registrador-de-presenca.glitch.me/EditaUsuario/'+ idUsuario, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: token,
        },
        body: jsonBody,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.affectedRows > 0) setMenssagem('Usuario Editado!');
          else setMenssagem('Erro!');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  async function carregaUsuario() {
    const token = await getToken();
    const idUsuario = await getId();
    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/' +
        idUsuario,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setNome(data[0].nome)
        setEmail(data[0].email)
        setSenha(data[0].senha)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    carregaUsuario();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={{ width: 150, height: 200 }}
            source={require('../assets/marca/logo_transparent.png')}
          />
        </View>
        <View style={styles.opcoesEdita}>
          <View style={styles.itemEdita}>
            <TextInput
              style={styles.inputForm}
              value = {nome? nome : 'Nome'}
              autoCapitalize="none"
              autoCorrect={true}
              onChangeText={(event) => setNome(event)}
            />
          </View>
          <View style={styles.itemEdita}>
            <TextInput
              style={styles.inputForm}
              value ={email ? email : 'Email'}
              autoCapitalize="none"
              autoCorrect={true}
              onChangeText={(event) => setEmail(event)}
            />
          </View>
          <View style={styles.itemEdita}>
            <TextInput
              style={styles.inputForm}
              value ={
                senha? '*'.repeat(senha.length) : 'Senha'
              }
              autoCompleteType="current-password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(event) => setSenha(event)}
            />
          </View>
          <View style={styles.itemEdita}>
            <TextInput
              style={styles.inputForm}
              placeholder={'Confirmar Senha'}
              autoCompleteType="current-password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(event) => setconfirmarSenha(event)}
            />
          </View>
          <View style={styles.botoes}>
            <TouchableOpacity
              style={styles.buttonForm}
              onPress={() => editaUsuario()}>
              <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonForm}
              onPress={() => navigation.goBack()}>
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textAlert}>{menssagem}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

