
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import RunningPaceCalculator from './screens/RunningPaceCalculator';
import PaceChart from './screens/PaceChart';
import Route from './screens/Route';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          headerStyle: styles.navbar,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pace Calculator" component={RunningPaceCalculator} />
        <Stack.Screen name="Pace Chart" component={PaceChart} />
        <Stack.Screen name="Route" component={Route} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#8D2003',
  },
};

export default App;