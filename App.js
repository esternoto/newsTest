/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from "mobx-react";
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  navigator
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Categories} from "./src/screens/categories";
import {News} from "./src/screens/news";
import {Favorites} from "./src/screens/favorites";
import {SingleNew} from "./src/screens/singleNew";
import {newsStorage} from "./model/newsStorage";


import {
  Colors,
  DebugInstruction,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Header} from './src/components/header';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
        <Provider newsStore={newsStorage}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Categories"}>
            <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{ title: 'Favorites' }}
            />
            <Stack.Screen
                name="Categories"
                component={Categories}
                options={{ title: 'Categories' }}
            />
            <Stack.Screen
                name="News"
                component={News}
                options={{ title: 'News' }}
            />
            <Stack.Screen
                name="SingleNew"
                component={SingleNew}
                options={{ title: 'News' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
  );
};



export default App;
