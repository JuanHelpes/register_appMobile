//não está sendo usada.
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import { View} from 'react-native';
import {Background} from '../components/Backgroud';



export function TelaDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Menu">
        <Drawer.Screen name="Menu 1" component={ () => <Background data={"Menu1"}/>} />
        <Drawer.Screen name="Menu 2" component={componenteTela} />
         <Drawer.Screen name="Menu 3" component={Background} />
      </Drawer.Navigator>
  );
}

function componenteTela(){
  return(
    <View/>
  );
}