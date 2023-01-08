import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstLoginScreen from './screens/Login/FirstLoginScreen';
import AddPostScreen from "./screens/Post/AddPostScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}
                             initialRouteName="AddPostScreen"
            >
                <Stack.Screen name="FirstLoginScreen" component={FirstLoginScreen}/>
                <Stack.Screen name="PostStatusScreen" component={AddPostScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
