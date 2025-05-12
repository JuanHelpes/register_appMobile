import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { styles } from '../styles/styleEventos';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getToken } from '../Rotes/Autentica';

export function TelaVisualizarEvento({ route, navigation }) {
  const { idEvento } = route.params;
  const { nomeEvento } = route.params;
  const [search, setSearch] = useState('');
  const [atividades, setAtividades] = useState([]);
  const [idAtividade, setIdAtividade] = useState('');
  const [nomeAtividade, setNomeAtividade] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  // mostra moda
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // fecha modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // mostra moda
  const handleOpenModalEdit = (idAtividade) => {
    setIdAtividade(idAtividade);
    setModalVisibleEdit(true);
  };

  // fecha modal
  const handleCloseModalEdit = () => {
    setModalVisibleEdit(false);
  };

  const updateSearch = (search) => {
    setSearch(search);
  };

  useFocusEffect(() => {
    async function fetchList() {
      const token = await getToken();

      fetch(
        'https://juanhelpes-registrador-de-presenca.glitch.me/evento/atividade/' +
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
          setAtividades(data);
        })
        .catch((err) => console.log(err));
    }
    fetchList();
  });

  const buscaLowerCase = search.toLowerCase();
  const filtro = atividades.filter((atividade) =>
    atividade.nome.toLowerCase().includes(buscaLowerCase)
  );

  async function criarAtividade(nomeAtividade) {
    const token = await getToken();

    var userObj = {
      nome: nomeAtividade,
    };
    var jsonBody = JSON.stringify(userObj);

    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/evento/criaAtividade/' +
        idEvento,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: token,
        },
        body: jsonBody,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows > 0) {
          setModalVisible(false);
          setNomeAtividade('');
          alert('Atividade Cadastrada!');
        } else alert('ERRO !!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function editaAtividade(nomeAtividade, idAtividade) {
    const token = await getToken();

    var userObj = {
      nome: nomeAtividade,
    };
    var jsonBody = JSON.stringify(userObj);

    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/evento/atualizaAtividade/' +
        idAtividade,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: token,
        },
        body: jsonBody,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows > 0) {
          setModalVisibleEdit(false);
          setNomeAtividade('');
          alert('Atividade atualizada!');
          
        } else alert('ERRO !!');
      })
      .catch((err) => {
        console.log(err);
      });
      handleCloseModalEdit
  }

  function confirmacao(ati_id) {
    return Alert.alert('Confirmar', 'Deseja mesmo excluir?', [
      {
        text: 'Sim',
        onPress: () => {
          deletaAtividade(ati_id);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  async function deletaAtividade(ati_id) {
    const token = await getToken();
    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/evento/deletaAtividade/' +
        ati_id,
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
          alert('Atividade excluida !');
        } else alert('Erro!');
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleCriar}>
        <Text style={styles.textButtonTitle}>Visualizar: {nomeEvento}</Text>
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
        {filtro.map((atividade) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.texto}>{atividade.nome}</Text>
            </View>
            <View style={styles.icons}>
              <Ionicons
                name="create"
                color="#fff"
                size={30}
                onPress={() => handleOpenModalEdit(atividade.ati_id)}
              />
              <Ionicons name="trash" color="#fff" size={30} onPress={() => confirmacao(atividade.ati_id)}/>
              <Ionicons
                name="people"
                color="#fff"
                size={30}
                onPress={() =>
                  navigation.navigate('TelaRegistraPresenca', {
                    idAtividade: atividade.ati_id,
                  })
                }
              />
            </View>
          </View> 
        ))}
      </ScrollView>
      <View style={styles.posicao}>
        <View style={styles.add}>
          <Ionicons
            name="add-outline"
            color="#fff"
            size={40}
            onPress={handleOpenModal}
          />
        </View>
      </View>
      <View style={styles.containerModal}>
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Nome da atividade"
                onChangeText={(event) => setNomeAtividade(event)}
                style={styles.textInputModal}
              />
              <View style={styles.buttonContainerModal}>
                <Button
                  title="Criar"
                  onPress={() => criarAtividade(nomeAtividade)}
                />
                <Button title="Cancelar" onPress={handleCloseModal} />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={modalVisibleEdit}
          animationType="fade"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Nome da atividade"
                onChangeText={(event) => setNomeAtividade(event)}
                style={styles.textInputModal}
              />
              <View style={styles.buttonContainerModal}>
                <Button
                  title="Salvar"
                  onPress={() => editaAtividade(nomeAtividade, idAtividade)}
                />
                <Button title="Cancelar" onPress={handleCloseModalEdit} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
