import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './BottomTab';
import SignUpScreen from '../Screens/SignUpScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default Navigator;
