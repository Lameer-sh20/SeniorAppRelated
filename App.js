import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Camera from './Screens/Camera';
import Posts from './Screens/Posts';
import Page from './Screens/Page';
import Location from './Screens/Location';
import ProductScanRNCamera from './Screens/ProductScanRNCamera';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Location"
          component={Location}
          options={{headerShown: false}}
        />*/}
        <Stack.Screen
          name="ProductScanRNCamera"
          component={ProductScanRNCamera}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Page"
          component={Page}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Posts"
          component={Posts}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
