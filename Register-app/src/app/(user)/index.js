import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { styles } from "../../../styles/styleUsuario";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { clearToken } from "../Rotes/Autentica";

export default function TelaUsuario({ navigation }) {
  const router = useRouter();
  //     async function deslogar() {
  //     const resp = await clearToken();
  //     if (resp) {
  //       navigation.navigate("TelaLogin");
  //     } else alert("Erro !");
  //   }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={{ width: 200, height: 300 }}
            source={require("../../../assets/marca/logo_transparent.png")}
          />
        </View>
        <View style={styles.opcoes}>
          <View style={styles.item}>
            <View style={styles.esquerdo}>
              <Ionicons name="person" color="#fff" size={30} />
              <Text style={styles.text}>Meu Perfil</Text>
            </View>
            <Ionicons
              style={styles.button}
              name="chevron-forward-circle-outline"
              color="#fff"
              size={30}
              onPress={() => router.push("/editaUser")}
            />
          </View>
          <View style={styles.item}>
            <View style={styles.esquerdo}>
              <Ionicons name="people" color="#fff" size={30} />
              <Text style={styles.text}>Organizadores</Text>
            </View>
            <Ionicons
              style={styles.button}
              name="chevron-forward-circle-outline"
              color="#fff"
              size={30}
            />
          </View>
          <View style={styles.item}>
            <View style={styles.esquerdo}>
              <Ionicons name="log-out" color="#fff" size={30} />
              <Text style={styles.text}>Deslogar</Text>
            </View>
            <Ionicons
              style={styles.button}
              name="chevron-forward-circle-outline"
              color="#fff"
              size={30}
              onPress={() => router.push("/login")}
              //   onPress={() => deslogar()}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
