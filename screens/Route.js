import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const Route = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(`Latitude: ${currentLocation.coords.latitude}, Longitude: ${currentLocation.coords.longitude}`);
    };

    getPermissions();
  }, [])

  const routeSteps = [
    'Start at the entrance of the park.',
    'Turn left onto Main Street.',
    'Continue straight for 500 meters.',
    'Turn right onto Elm Avenue.',
    'Finish at the town square.',
  ];

  return (
    <View style={styles.container}>
      <Text>Current Location:</Text>
      <Text>{location}</Text>
      <Text style={styles.heading}>Route Steps</Text>
      {routeSteps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepNumber}>{index + 1}</Text>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumber: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
  },
});

export default Route;
