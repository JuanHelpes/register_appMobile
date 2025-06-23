import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#C4C4C4",
  },
  inputForm: {
    backgroundColor: "#FFF",
    color: "#00ADB5",
    marginTop: 13,
    width: 300,
    height: 35,
    padding: 5,
    borderRadius: 70,
    elevation: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonForm: {
    backgroundColor: "#696969",
    width: 100,
    height: 40,
    borderRadius: 20,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#FFF",
    fontWeight: "bold",
  },
  textButtonTitle: {
    color: "#000",
    fontWeight: "bold",
  },
  titleCriar: {
    top: 60,
    left: 10,
    width: 140,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000000",
    elevation: 10,
  },
  buttonDate: {
    marginTop: 10,
  },
});
