import { StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 2,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#C4C4C4',
  },
  bgcontainer: {
    flex: 1,
  },
  bgtext: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#575757',
    flex: 1,
  },
  inputUserName: {
    backgroundColor: '#FFF',
    width: 250,
    height: 35,
    borderRadius: 5,
    padding: 5,
  },
  inputForm: {
    backgroundColor: '#FFF',
    color: '#00ADB5',
    marginTop: 13,
    width: 250,
    height: 35,
    padding: 5,
    borderRadius: 70,
  },
  buttonForm: {
    backgroundColor: '#00ADB5',
    width: 100,
    height: 30,
    borderRadius: 10,
    marginTop: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#000',
    fontWeight: 'bold',
  },
  textAlert: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  image: {
    width: 350,
    marginBottom: 60,
    height: 350
  }
});
