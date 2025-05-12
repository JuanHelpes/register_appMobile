import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4C4C4',
  },
  inputForm: {
    backgroundColor: '#FFF',
    color: '#00ADB5',
    width: 300,
    height: 35,
    padding: 5,
    borderRadius: 40,
    elevation: 10,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 100,
  },
  opcoes: {
    flex: 1,
    backgroundColor: '#575757',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  item: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemEdita: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAlert: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  opcoesEdita: {
    flex: 2,
    backgroundColor: '#575757',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
  },
  buttonForm: {
    backgroundColor: '#00ADB5',
    width: 100,
    height: 30,
    borderRadius: 10,
    marginTop: 13,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  esquerdo: {
    flexDirection: 'row',
    padding: 20,
  },
  text: {
    padding: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
  },
});
