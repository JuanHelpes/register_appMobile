import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { styles } from '../styles/styleEventos';
import { Ionicons } from '@expo/vector-icons';
import { getToken, getId } from '../Rotes/Autentica';
import { useFocusEffect } from '@react-navigation/native';

export function TelaEventos({ navigation }) {
  const [search, setSearch] = useState('');
  const [eventos, setEventos] = useState([]);
  const updateSearch = (search) => {
    setSearch(search);
  };

  async function fetchList() {
    const token = await getToken();
    const userId = await getId();

    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/eventos/' +
        userId,
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
        setEventos(data);
      })
      .catch((err) => console.log(err));
  }

  useFocusEffect(() => {
    fetchList();
  });
  
  function confirmacao(eve_id) {
    return Alert.alert('Confirmar', 'Deseja mesmo excluir?', [
      {
        text: 'Sim',
        onPress: () => {
          deletaEvento(eve_id);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  async function deletaEvento(eve_id) {
    const token = await getToken();
    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/deletaEvento/' +
        eve_id,
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
        if (data.affectedRows > 0) {
          alert('Evento Excluido !');
        } else setMenssagem('Erro!');
      })
      .catch((err) => console.log(err));
  }

  const buscaLowerCase = search.toLowerCase();
  const filtro = eventos.filter((evento) =>
    evento.nome.toLowerCase().includes(buscaLowerCase)
  );

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View style={styles.titleCriar}>
          <Text style={styles.textButtonTitle}> Eventos</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          lightTheme
          inputContainerStyle={{ borderRadius: 20 }}
          containerStyle={{ backgroundColor: 'C4C4C4', borderRadius: 20 }}
        />
      </View>
      <ScrollView style={styles.lista}>
        {filtro.map((evento) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.texto}>{evento.nome}</Text>
              <Text style={styles.texto}>
                {evento.status == 1 ? 'Em Execução' : 'Finalizado'}
              </Text>
            </View>
            <View style={styles.icons}>
              <Ionicons
                onPress={() =>
                  navigation.navigate('TelaAddOrganizadores', {
                    idEvento: evento.eve_id,
                  })
                }
                name="share"
                color="#fff"
                size={30}
              />
              <Ionicons
                onPress={() =>
                  navigation.navigate('TelaEditaEvento', {
                    idEvento: evento.eve_id,
                  })
                }
                name="create"
                color="#fff"
                size={30}
              />
              <Ionicons
                onPress={() => confirmacao(evento.eve_id)}
                name="trash"
                color="#fff"
                size={30}
              />
              <Ionicons
                name="eye"
                color="#fff"
                size={30}
                onPress={() =>
                  navigation.navigate('TelaVisualizarEvento', {
                    nomeEvento: evento.nome,
                    idEvento: evento.eve_id,
                  })
                }
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
