import { NavigationContainer } from "@react-navigation/native";
import { Autentica } from "./Rotes/Autentica";
import { TelaTab } from "./screens/TelaTab";
import { TelaEventos } from "./screens/TelaEventos";

// import { TelaCriarEvento } from './screens/TelaCriarEvento';
// import { TelaEventos } from './screens/TelaEventos';
// import { TelaVisualizarEvento } from './screens/TelaVisualizarEvento';
// import { TelaEventosCompartilhados } from './screens/TelaEventosCompartilhados';
// import { TelaUsuario } from './screens/TelaUsuario';
// import { TelaEditaEvento } from './screens/TelaEditaEvento';
// import { TelaRegistraPresenca } from './screens/TelaRegistraPresenca';
// import { TelaAddOrganizadores } from './screens/TelaAddOrganizadores';
// import { TelaEditaUsuario } from './screens/TelaEditaUsuario';

export default function App() {
  return (
    <NavigationContainer>
      <TelaEventos />
    </NavigationContainer>
    //<TelaEventos/>
    // <TelaVisualizarEvento/>
    // <TelaEventosCompartilhados/>
    // <TelaUsuario/>
    //<TelaEditaUsuario/>
    // <TelaEditaEvento/>
    // <TelaRegistraPresenca/>
    // <TelaAddOrganizadores/>
  );
}
