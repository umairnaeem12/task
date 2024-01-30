import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationScreen from '../Screens/NotificationScreen';
import PhotoScreen from '../Screens/PhotoScreen';
import TextScreen from '../Screens/TextScreen';
import CalculatorScreen from '../Screens/CalculatorScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PhotoScreen"
        component={PhotoScreen}
        options={{
          tabBarLabel: 'Photo',
          tabBarIcon: ({color, size}) => (
            <Icon name="image" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TextScreen"
        component={TextScreen}
        options={{
          tabBarLabel: 'Text',
          tabBarIcon: ({color, size}) => (
            <Icon name="database" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
        options={{
          tabBarLabel: 'Calculator',
          tabBarIcon: ({color, size}) => (
            <Icon name="calculator" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
