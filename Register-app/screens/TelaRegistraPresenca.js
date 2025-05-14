import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { styles } from '../styles/styleRegistraPresenca';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getToken } from '../Rotes/Autentica';

export function TelaRegistraPresenca({ route }) {
  const { idAtividade } = route.params;
  const [search, setSearch] = useState('');
  const [presencas, setPresencas] = useState([]);
  const updateSearch = (search) => {
    setSearch(search);
  };

  useFocusEffect(() => {
    async function fetchList() {
      const token = await getToken();

      fetch(
        'https://juanhelpes-registrador-de-presenca.glitch.me//usuarios/Evento/ListaPresenca/' +
          idAtividade,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: token,
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setPresencas(data);
        })
        .catch((err) => console.log(err));
    }
    fetchList();
  });

  function confirmacao(par_id) {
    return Alert.alert('Confirmar', 'Deseja mesmo excluir presença?', [
      {
        text: 'Sim',
        onPress: () => {
          deletaPresenca(par_id);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  async function deletaPresenca(par_id) {
    const token = await getToken();
    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/evento/deletaPresenca/' +
        par_id,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.affectedRows > 0) alert('Presenca Excluida !');
        else alert('Erro!');
      })
      .catch((err) => console.log(err));
  }

  async function registrarPresenca() {
    const token = await getToken();
      var userObj = { par_id: search };
      var jsonBody = JSON.stringify(userObj);
    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/evento/atividade/registraPresenca/' +
        idAtividade,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: jsonBody,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.affectedRows > 0) alert('Presenca registrada !');
        else alert('Erro!');
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.titleCriar}>
          <Text style={styles.textButtonTitle}> Registrar Presença</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          lightTheme
          inputContainerStyle={{ borderRadius: 20 }}
          containerStyle={{ backgroundColor: 'C4C4C4', borderRadius: 20, width: 300, }}
        />
        <Ionicons
          name="qr-code-outline"
          color="#000"
          size={40}
        />
      </View>
      <View style={styles.registrar} >
        <View style={styles.bordaTexto}>
          <Text style={styles.texto} onPress={() => registrarPresenca()} >Registrar</Text>
        </View>
      </View>
      <Text style={styles.texto2}>Registrados</Text>
      <ScrollView style={styles.lista}>
        {presencas.map((presenca) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.texto}>{presenca.nome}</Text>
            </View>
            <View style={styles.icons}>
              <Ionicons
                onPress={() => confirmacao(presenca.par_id)}
                name="trash"
                color="#fff"
                size={30}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
