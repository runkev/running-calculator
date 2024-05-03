import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Running App</Text>
        <Pressable 
          onPress={() => navigation.navigate('Pace Calculator')}
          style={styles.button} 
        >
          <Text style={styles.buttonText}>Running Pace Calculator</Text>
        </Pressable>
        <Pressable 
          onPress={() => navigation.navigate('Pace Chart')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pace Chart</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Route')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Route</Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#E6E8E6',
      padding: 20,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textTransform: 'uppercase',
    },
    button: {
      width: '80%',
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#8D2003',
      marginBottom: 30,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
});

export default HomeScreen;