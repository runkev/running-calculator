import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RunningPaceCalculator = () => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [pace, setPace] = useState('');

  const calculateTimeFromPace = () => {
    // Assuming pace is in format "mm:ss"
    const paceInSeconds = paceToSeconds(pace);
    const timeInSeconds = paceInSeconds * parseFloat(distance);
    setTime(formatTime(timeInSeconds));
  };

  const calculatePaceFromTime = () => {
    const timeInSeconds = timeToSeconds(time);
    const paceInSeconds = timeInSeconds / parseFloat(distance);
    setPace(formatPace(paceInSeconds));
  };

  const paceToSeconds = (pace) => {
    const [minutes, seconds] = pace.split(':').map(parseFloat);
    return minutes * 60 + seconds;
  };

  const timeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const formatPace = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text>Running Pace Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Distance (miles)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (hh:mm:ss)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Pace (mm:ss)"
        value={pace}
        onChangeText={setPace}
      />
      <Button 
        title="Calculate Time" 
        onPress={calculateTimeFromPace} 
        disabled={!distance || !pace}
      />
      <Button title="Calculate Pace" onPress={calculatePaceFromTime} />
      <Text>Result:</Text>
      <Text>{time ? `Time: ${time}` : ''}</Text>
      <Text>{pace ? `Pace: ${pace}` : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default RunningPaceCalculator;
