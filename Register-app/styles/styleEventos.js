import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    backgroundColor: '#C4C4C4',
    overflow: 'scroll',
  },
  searchBar: {
    marginTop: 120,
    justifyContent: 'center',
  },
  topo:{
    // flex: 1,
    flexDirection: 'row',
  },
  lista: {
    // height: 10,
    maxHeight: 450,
  },
  textButtonTitle: {
    color: '#000',
    fontWeight: 'bold',
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titleCriar: {
    top: 90,
    left: 10,
    width: 90,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000000',
    elevation: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#575757',
    maxHeight: 60,
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  icons: {
    flexDirection: 'row',
  },
  add: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#575757',
    margin: 10,
    borderRadius: 100,
  },
  posicao: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparência para escurecer o conteúdo de fundo
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  textInputModal: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainerModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
