import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Home from '../principalapp/Home';
import Crear from './Crear';
import Result from '../principalapp/Result';

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Nuevo" component={Crear} />
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Resultado" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



