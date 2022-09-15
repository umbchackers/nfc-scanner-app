import React, { useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function AuditLog( {navigation, route} ) {
  
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View>
            <Text>Audit Log</Text>
            <Button
                title="Build Tag"
                onPress={() => {navigation.navigate('BuildTag')}}
            />
            <Button
                title="Scan Tag"
                onPress={() => {navigation.navigate('ScanTag')}}
            />
            <Button
                title="Home"
                onPress={() => {navigation.navigate('Home')}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default AuditLog;