import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { getToken } from "../Rotes/Autentica";
import { useState, useEffect } from "react";

import { styles } from "../styles/styleCriarEvento";

export function TelaEditaEvento({ route }) {
  const { idEvento } = route.params;
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [nomeEvento, setNomeEvento] = useState("");
  const [status, setStatus] = useState("-");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerFinal, setShowDatePickerFinal] = useState(false);

  //data inicio
  const handleDateChange = (event, date) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setDataInicio(formattedDate);
    }
    setShowDatePicker(false);
  };

  //data final
  const handleDateChangeFinal = (event, date) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setDataFinal(formattedDate);
    }
    setShowDatePickerFinal(false);
  };

  //data inicio
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  //data final
  const showDatePickerModal1 = () => {
    setShowDatePickerFinal(true);
  };

  //data inicio
  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  //data final
  const hideDatePickerModal1 = () => {
    setShowDatePickerFinal(false);
  };

  async function carregaEvento() {
    const token = await getToken();

    fetch(
      "https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/evento/" +
        idEvento,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setNomeEvento(data[0].nome);
        setDataInicio(data[0].dataInicial);
        setDataFinal(data[0].dataFinal);
        setStatus(data[0].status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function editaEvento() {
    const token = await getToken();

    var userObj = {
      nome: nomeEvento,
      dataInicial: dataInicio,
      dataFinal: dataFinal,
      status: status,
    };
    var jsonBody = JSON.stringify(userObj);

    fetch(
      "https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/EditaEvento/" +
        idEvento,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: token,
        },
        body: jsonBody,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.affectedRows > 0) alert("Evento editado!");
        else setMenssagem("Erro!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    carregaEvento();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleCriar}>
        <Text style={styles.textButtonTitle}>
          {" "}
          Editar Evento {nomeEvento ? nomeEvento : "Nome do Evento"}{" "}
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.inputForm}
          value={nomeEvento ? nomeEvento : "Nome do Evento"}
          autoCapitalize="none"
          autoCorrect={true}
          onChangeText={(event) => setNomeEvento(event)}
        />
        <View style={styles.buttonDate}>
          <Button
            color="#696969"
            title="Selecionar data de inicio"
            onPress={showDatePickerModal}
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            style={styles.inputForm}
            value={dataInicio ? new Date(dataInicio) : new Date()}
            onChange={handleDateChange}
            onTouchCancel={hideDatePickerModal}
          />
        )}
        <TextInput
          value={dataInicio ? dataInicio : "dataInicio"}
          placeholder="Data selecionada"
          editable={false}
        />
        <View style={styles.buttonDate}>
          <Button
            color="#696969"
            title="Selecionar data final"
            onPress={showDatePickerModal1}
          />
        </View>
        {showDatePickerFinal && (
          <DateTimePicker
            style={styles.inputForm}
            value={dataFinal ? new Date(dataFinal) : new Date()}
            onChange={handleDateChangeFinal}
            onTouchCancel={hideDatePickerModal1}
          />
        )}
        <TextInput
          value={dataFinal ? dataFinal : "dataFinal"}
          placeholder="Data selecionada"
          editable={false}
        />
        <Text>Status do Evento:</Text>
        <Picker
          selectedValue={status != "-" ? String(status) : "0"}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Em execução" value="1" />
          <Picker.Item label="Finalizado" value="0" />
        </Picker>

        <TouchableOpacity
          style={styles.buttonForm}
          onPress={() => editaEvento()}
        >
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
