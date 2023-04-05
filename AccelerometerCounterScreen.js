import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const THRESHOLD = 1.2; // The threshold value for detecting steps
const STEP_DELAY = 300; // The delay (in milliseconds) between steps

export default function AccelerometerCounterScreen() {
    const [passos, setPassos] = useState(0);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [lastStepTime, setLastStepTime] = useState(Date.now());
  const [accelerationValue, setAccelerationValue]=useState(0);

  useEffect(() => {
    Accelerometer.addListener(accelerometerData => {
      //setData(accelerometerData);
      detectStep(accelerometerData);
    });

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  const { x, y, z } = data;

  const detectStep = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      const now = Date.now();
      setLastStepTime(now);
      if (acceleration > THRESHOLD  && now - lastStepTime > STEP_DELAY) {
        setPassos(prevPassos => prevPassos + 1);
        setData({x,y,z});
        setAccelerationValue(acceleration);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Steps: {passos}</Text>
      <Text>X: {x}</Text>
      <Text>Y: {y}</Text>
      <Text>Z: {z}</Text>
      <Text>{accelerationValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
});
