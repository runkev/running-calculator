import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home Screen</Text>
        <Button 
          title="Go to Running Pace Calculator" 
          onPress={() => navigation.navigate('Pace Calculator')} 
        />
        <Button 
          title="Go to Pace Chart" 
          onPress={() => navigation.navigate('Pace Chart')}
        />
        <Button
          title='Go to Route'
          onPress={() => navigation.navigate('Route')}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    }
});

export default HomeScreen;