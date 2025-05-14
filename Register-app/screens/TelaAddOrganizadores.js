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
import { getToken } from '../Rotes/Autentica';
import { useFocusEffect } from '@react-navigation/native';

export function TelaAddOrganizadores({ route }) {
  const { idEvento } = route.params;
  const [search, setSearch] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const updateSearch = (search) => {
    setSearch(search);
  };

  useFocusEffect(() => {
    async function fetchList() {
      const token = await getToken();

      fetch(
        'https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/AcessaEvento/' +
          idEvento,
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
          setUsuarios(data);
        })
        .catch((err) => console.log(err));
    }
    fetchList();
  });

  async function retiraOrganizador(IdUsuario) {
    const token = await getToken();

    var userObj = {
      usu_id: IdUsuario,
    };
    var jsonBody = JSON.stringify(userObj);

    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/retiraOrganizador/' +
        idEvento,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: jsonBody,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows > 0) alert('Organizador retirado!');
        else alert('Erro!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function confirmacao(IdUsuario) {
    return Alert.alert('Confirmar', 'Deseja mesmo retirar organizador?', [
      {
        text: 'Sim',
        onPress: () => {
          retiraOrganizador(IdUsuario);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  async function adicionaOrganizador() {
    const token = await getToken();

    var userObj = {
      usu_id: search,
    };
    var jsonBody = JSON.stringify(userObj);

    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/compartilhaEvento/' +
        idEvento,
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
     .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows > 0) alert('Organizador adicionado!');
        else alert('Erro!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const buscaLowerCase = search.toLowerCase();
  const filtro = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(buscaLowerCase)
  );

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.titleCriar}>
          <Text style={styles.textButtonTitle}>Adicionar Organizadores</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          lightTheme
          inputContainerStyle={{ borderRadius: 20 }}
          containerStyle={{
            backgroundColor: 'C4C4C4',
            borderRadius: 20,
            width: 350,
          }}
        />
      </View>
      <View style={styles.registrar}>
        <View style={styles.bordaTexto}>
          <Text style={styles.texto} onPress={() => adicionaOrganizador()}>Adicionar</Text>
        </View>
      </View>
      <Text style={styles.texto2}>Organizadores</Text>
      <ScrollView style={styles.lista}>
        {filtro.map((usuario) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.texto}>{usuario.nome}</Text>
              <Text style={styles.texto}>{usuario.status}</Text>
            </View>
            <View style={styles.icons}>
              <Ionicons
                onPress={() => confirmacao(usuario.usu_id)}
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
