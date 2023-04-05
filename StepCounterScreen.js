import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { Permissions } from 'expo-permissions';


export default function StepCounterScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    subscribePermition();
    subscribe();
    //const subscription = subscribe();
   // return () => subscription && subscription.remove();
  }, []);

  const subscribePermition = async () =>{
    try {
        Permissions.askAsync(Permissions.Pedometer).then(result =>{
            console.log(result.status);
        });
     /*   const response = await Permissions.askAsync(Permissions.MOTION);
        if (response.status === 'granted') {
          // Permission granted, continue with your code
          console.log('Motion permission status:', response.status);
        } else {
          // Permission not granted, handle the error
          console.log('Motion permission status:', response.status);
        }*/
      } catch (error) {
        // Handle the error here
        console.log(error);
      }
    //const status = await Permissions.askAsync(Permissions.MOTION);
    //console.log('Motion permission status:', status);
  }

  const subscribe = () => {
    Pedometer.isAvailableAsync().then(result => {
        setIsPedometerAvailable(String(result));
        return Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps);
          });
    });

  /*  if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }*/
  };

  return (
    <View style={styles.container}>
        <Text>{isPedometerAvailable}</Text>
      <Text style={styles.title}>Step Counter</Text>
      <Text style={styles.steps}>{currentStepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  steps: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
