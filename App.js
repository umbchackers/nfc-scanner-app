import React, { useState, useEffect} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import BuildTag from './src/pages/BuildTag';
import ScanTag from './src/pages/ScanTag';
import AuditLog from './src/pages/AuditLog';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="BuildTag"
          component={BuildTag}
        />
        <Stack.Screen
          name="ScanTag"
          component={ScanTag}
        />
        <Stack.Screen
          name="AuditLog"
          component={AuditLog}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
