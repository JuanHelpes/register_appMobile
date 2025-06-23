import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { SearchBar } from "@rneui/themed";
import { styles } from "../../../styles/styleEventos";
import { Ionicons } from "@expo/vector-icons";
import { getToken, getId } from "../../../Rotes/Autentica";
import { useRouter } from "expo-router";

export default function TelaEventosCompartilhados() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  //   const [eventos, setEventos] = useState([]);
  const [eventos, setEventos] = useState([
    { eve_id: 1, nome: "Festa Junina", status: 1 },
    { eve_id: 2, nome: "Workshop de React Native", status: 0 },
    { eve_id: 3, nome: "Palestra sobre IA", status: 1 },
    { eve_id: 4, nome: "Semana da Engenharia", status: 0 },
    { eve_id: 5, nome: "Hackathon Universitário", status: 1 },
  ]);
  const updateSearch = (search) => {
    setSearch(search);
  };

  //   useEffect(() => {
  //     async function fetchList() {
  //       const token = await getToken();
  //       const userId = await getId();
  //       fetch(
  //         'https://juanhelpes-registrador-de-presenca.glitch.me//usuarios/eventosCompartilhados/' +
  //           userId,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json',
  //             authorization: token,
  //           },
  //         }
  //       )
  //         .then((resp) => resp.json())
  //         .then((data) => {
  //           setEventos(data);
  //           console.log(data);
  //         })
  //         .catch((err) => console.log(err));
  //     }

  //     fetchList();
  //   }, []);

  const buscaLowerCase = search.toLowerCase();
  const filtro = eventos.filter((evento) =>
    evento.nome.toLowerCase().includes(buscaLowerCase)
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          top: 60,
          left: 10,
          width: 180,
          backgroundColor: "#FFFFFF",
          padding: 10,
          borderRadius: 20,
          shadowColor: "#000000",
          elevation: 10,
        }}
      >
        <Text style={styles.textButtonTitle}> Eventos Compartilhados </Text>
      </View>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          lightTheme
          inputContainerStyle={{ borderRadius: 20 }}
          containerStyle={{ backgroundColor: "C4C4C4", borderRadius: 20 }}
        />
      </View>
      <ScrollView style={styles.lista}>
        {filtro.map((evento) => (
          <View style={styles.item} key={evento.eve_id}>
            <View>
              <Text style={styles.texto}>{evento.nome}</Text>
              <Text style={styles.texto}>
                {evento.status == 1 ? "Em Execução" : "Finalizado"}
              </Text>
            </View>
            <View style={styles.icons}>
              <Ionicons
                name="eye"
                color="#fff"
                size={30}
                onPress={() =>
                  router.push({
                    pathname: "/visualizarEvento",
                    params: {
                      idEvento: evento.eve_id,
                      nomeEvento: evento.nome,
                    },
                  })
                } // Navega para a tela de visualização do evento
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
