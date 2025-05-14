import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { getToken, getId } from '../Rotes/Autentica';

import { styles } from '../styles/styleCriarEvento';

export function TelaCriarEvento() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [nomeEvento, setNomeEvento] = useState('');
  const [selectedValue, setSelectedValue] = useState('1');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerFinal, setShowDatePickerFinal] = useState(false);

  //data inicio
  const handleDateChange = (event, date) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setDataInicio(formattedDate);
    }
    setShowDatePicker(false);
  };

  //data final
  const handleDateChangeFinal = (event, date) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
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

  async function criarEvento() {
    const token = await getToken();
    const userId = await getId();

    var userObj = {
      nome: nomeEvento,
      dataInicial: dataInicio,
      dataFinal: dataFinal,
      status: selectedValue,
    };
    var jsonBody = JSON.stringify(userObj);

    fetch(
      'https://juanhelpes-registrador-de-presenca.glitch.me/usuarios/criaEvento/' +
        userId,
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
        if (data.affectedRows > 0){
          setNomeEvento('');
          // setDataInicio('');
          // setDataFinal('');
          // setSelectedValue('');
          alert('Evento Cadastrado!');
        } 
        else alert('Erro!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleCriar}>
        <Text style={styles.textButtonTitle}> Criação de Evento </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.inputForm}
          placeholder="Nome do Evento"
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
            value={new Date()}
            onChange={handleDateChange}
            onTouchCancel={hideDatePickerModal}
          />
        )}
        <TextInput
          value={dataInicio}
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
            value={new Date()}
            onChange={handleDateChangeFinal}
            onTouchCancel={hideDatePickerModal1}
          />
        )}
        <TextInput
          value={dataFinal}
          placeholder="Data selecionada"
          editable={false}
        />
        <Text>Status:</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}>
          <Picker.Item label="Em execução" value="1" />
          <Picker.Item label="Finalizado" value="0" />
        </Picker>

        <TouchableOpacity
          style={styles.buttonForm}
          onPress={() => criarEvento()}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
