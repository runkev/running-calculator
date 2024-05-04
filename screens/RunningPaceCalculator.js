import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';

const RunningPaceCalculator = () => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [pace, setPace] = useState('');
  const [selectedOption, setSelectedOption] = useState('PACE');
  const [units, setUnits] = useState('Miles');

  const radios = ['DISTANCE', 'PACE', 'TIME'];

  const handlePress = (radio) => {
    setSelectedOption(radio);
  };

  function handleUnitChange() {
    setUnits(units === 'Miles' ? 'Kilometers' : 'Miles');
  }

  function handleReset() {
    setDistance('');
    setTime('');
    setPace('');
  }

  const calculateTime = () => {
    // Assuming pace is in format "mm:ss"
    const paceInSeconds = paceToSeconds(pace);
    const timeInSeconds = paceInSeconds * parseFloat(distance);
    setTime(formatTime(timeInSeconds));
  };

  const calculatePace = () => {
    const timeInSeconds = timeToSeconds(time);
    const paceInSeconds = timeInSeconds / parseFloat(distance);
    setPace(formatPace(paceInSeconds));
  };

  const calculateDistance = () => {
    const timeInSeconds = timeToSeconds(time);
    const paceInSeconds = paceToSeconds(pace);
    setDistance((timeInSeconds / paceInSeconds).toFixed(2));
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
      <Text style={styles.text}>Calculate:</Text>
      <View style={styles.radiobox}>
        {radios.map((radio) => (
          <Pressable
            key={radio}
            onPress={() => setSelectedOption(radio)}
            style={({pressed}) => [
              styles.radio,
              {
                backgroundColor: selectedOption === radio || pressed ? '#CED0CE' : '#fff',
                borderColor: selectedOption === radio || pressed ? '#8D2003' : '#ccc',
                borderWidth: 1.5,
                elevation: selectedOption === radio || pressed ? 0 : 12,
              },
            ]}
          >
            <Text style={styles.radiotext}>{radio}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.inputBox}>
        {selectedOption !== 'DISTANCE' && (
          <TextInput
            style={styles.input}
            placeholder="Distance (miles)"
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
          />        
        )}
        {selectedOption !== 'TIME' && (
          <TextInput
            style={styles.input}
            placeholder="Time (hh:mm:ss)"
            value={time}
            onChangeText={setTime}
          />        
        )}
        {selectedOption !== 'PACE' && (
          <TextInput
            style={styles.input}
            placeholder="Pace (mm:ss)"
            value={pace}
            onChangeText={setPace}
          />
        )}
      </View>
      <Pressable 
        onPress={() => selectedOption === 'DISTANCE' ? calculateDistance() : selectedOption === 'TIME' ? calculateTime() : calculatePace()} 
        style={({pressed}) => [
          styles.button,
          {
            backgroundColor: '#8D2003',
            borderColor: pressed ? '#8D2003' : '#ccc',
            elevation: pressed ? 0 : 12,
          },
        ]}
      >
        <Text style={styles.buttonText}>CALCULATE {selectedOption}</Text>
      </Pressable>

      <View style={styles.output}>
        <Text style={styles.outputText}>
          {selectedOption === 'DISTANCE' ? `${distance} miles` : selectedOption === 'TIME' ? `${time}` : `${pace} / mile`}
        </Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.buttonSection}>
          <Pressable
            onPress={handleUnitChange}
            style={({pressed}) => [
              styles.bottomBtn,
              {
                backgroundColor: '#8D2003',
                borderColor: pressed ? '#8D2003' : '#ccc',
                elevation: pressed ? 0 : 12,
              },
            ]}
          >
            <Text style={styles.buttonText}>{units}</Text>
          </Pressable>
          <Pressable
            onPress={handleReset}
            style={({pressed}) => [
              styles.bottomBtn,
              {
                backgroundColor: '#8D2003',
                borderColor: pressed ? '#8D2003' : '#ccc',
                elevation: pressed ? 0 : 12,
              },
            ]}
          >
            <Text style={styles.buttonText}>RESET</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E6E8E6'
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  inputBox: {
    width: '100%',
    marginBottom: 20,
  },
  bottom: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: '#E6E8E6',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#191919',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  output: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#191919',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  outputText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  radiobox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  radio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selected: {
    flex: 1,
    padding: 10,
    backgroundColor: 'ccc',
    borderWidth: 1,
    borderColor: '#191919',
    borderRadius: 5,
    mouse: 'pointer',
  },
  radiotext: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191919',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#8D2003',
    marginBottom: 30,
  },
  bottomBtn: {
    width: '30%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#8D2003',
    marginBottom: 10,
  },
});

export default RunningPaceCalculator;
