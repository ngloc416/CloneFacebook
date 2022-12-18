import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstLoginScreen from './screens/Login/FirstLoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstLoginScreen" component={FirstLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
