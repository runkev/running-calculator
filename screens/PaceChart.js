import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Switch, Picker } from 'react-native';

const PaceChart = () => {
  const [raceDistance, setRaceDistance] = useState('');
  const [paceData, setPaceData] = useState([]);
  const [toggleInput, setToggleInput] = useState(false);

  const generatePaceData = () => {
    if (!raceDistance) {
      Alert.alert('Error', 'Please enter a race distance');
      return;
    }

    // Calculate pace data
    const paceIncrement = 5; // Pace increment in seconds
    const raceDistanceMiles = parseFloat(raceDistance);
    const paceData = [];
    let paceSeconds = 0;

    for (let i = 0; i < raceDistanceMiles; i++) {
      const milePace = secondsToPace(paceSeconds);
      paceData.push({ milePace, time: paceSeconds * raceDistanceMiles });
      paceSeconds += paceIncrement;
    }

    setPaceData(paceData);
  };

  const secondsToPace = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.milePace} min/mile</Text>
      <Text style={styles.cell}>{secondsToPace(item.time)}</Text>
    </View>
  );

  const toggleInputType = () => {
    setToggleInput((prevState) => !prevState);
    setRaceDistance('');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Pace Chart</Text>
        <View style={styles.inlineContainer}>
            <Text>Toggle to enter custom distance</Text>
            <Switch 
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={toggleInput ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleInputType} 
                value={toggleInput} 
            />
        </View>
        {/* {toggleInput ? (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Race Distance (miles)"
                    keyboardType="numeric"
                    value={raceDistance}
                    onChangeText={setRaceDistance}
                />
            </View>
        ) : (
            <View>
                <Picker
                    selectedValue={raceDistance}
                    // style={styles.input}
                    onValueChange={(itemValue, itemIndex) => setRaceDistance(itemValue)}
                >
                    <Picker.Item label="5K" value="3.1" />
                    <Picker.Item label="10K" value="6.2" />
                    <Picker.Item label="Half Marathon" value="13.1" />
                    <Picker.Item label="Marathon" value="26.2" />
                </Picker>
            </View>
        )} */}
        <Button title="Generate Pace Chart" onPress={generatePaceData} />
        <FlatList
            data={paceData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cell: {
    fontSize: 16,
  },
});

export default PaceChart;
