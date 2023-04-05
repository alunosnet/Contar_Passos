import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import StepCounterScreen from './StepCounterScreen';
import AccelerometerCounterScreen from './AccelerometerCounterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StepCounter" component={StepCounterScreen} />
        <Stack.Screen name="AccelerometerCounter" component={AccelerometerCounterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
