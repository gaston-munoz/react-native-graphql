import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Home from './components/Home';
import ListEntities from './components/ListEntities'; 
import ProviderDataContext from './context/Context';
import ProviderDetailsContext from './context/DetailsContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailEntity from './components/DetailEntity';
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <ProviderDataContext>
        <ProviderDetailsContext>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: 'Home',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="List"
                component={ListEntities}
                options={{
                  title: 'Awesome Rick & Morty',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Details"
                component={DetailEntity}
                options={{
                  title: 'Details',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProviderDetailsContext>
      </ProviderDataContext>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  sectionDescription: {
    fontSize: 20,
  },
});

export default App;
