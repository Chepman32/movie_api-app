// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';
import { Search } from "./Search"
import Spinner from './Spinner';
import { MovieInfo } from './MovieInfo';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main } from './Main';
import AppIntro from './AppIntro';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
        <Stack.Screen name="AppIntro" component={AppIntro} />
      <Stack.Screen name="Main" component={Main} options={{
        title: "Trending now"
      }} />
      <Stack.Screen name="Spinner" component={Spinner}/>
      <Stack.Screen name="MovieInfo" component={MovieInfo} options={{
        headerBackTitleVisible: false,
        headerLeft: null,
        headerTintColor: "#fff"

      }} />
      <Stack.Screen name="Search" component={Search} options={{
        title: "Search"
      }} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={Search}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen name="MovieInfo" component={MovieInfo} options={{
        headerBackTitleVisible: false,
        headerLeft: null,
        headerTintColor: "#fff"

      }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        tabBarOptions={{
          activeTintColor: '#20BEF1',
        }}>
          <Tab.Screen
          name="AppIntro"
          component={AppIntro}
              />
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="movie-search-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
