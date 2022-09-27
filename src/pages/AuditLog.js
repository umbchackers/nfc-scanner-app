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
  TextInput
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FirebaseManager from '../FirebaseManager';
import styles from '../assets/StyleSheets';

function AuditLog( {navigation, route} ) {
  
    const userProfile = route.params;
    const [scan, setScan] = useState(true);
    const [auditContent, setAuditContent] = useState([]);
    const [queryName, setQueryName] = useState('');
    const [queryOperation, setQueryOperation] = useState('')
    const [queryOperationResult, setQueryOperationResult] = useState('');

    if(scan) {
      updateLogs();

      setScan(false);
    }

    async function updateLogs() {
      const logs = await FirebaseManager.searchAuditLogs(queryName, queryOperation, queryOperationResult)
      logs.reverse();
      setAuditContent(logs);
    }

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
          <Text style={styles.navbarHeaderText}>Welcome back, {userProfile.username}</Text>
          <View style={styles.navbarView}>
              <Button
                  title="Home"
                  onPress={() => {navigation.navigate('Home', { username: userProfile.username })}}
              />
              <Button
                  title="Scan Tag"
                  onPress={() => {navigation.navigate('ScanTag', { username: userProfile.username })}}
              />
              <Button
                  title="Build Tag"
                  onPress={() => {navigation.navigate('BuildTag', { username: userProfile.username })}}
              />
            </View>
          <View>
          <TextInput
                onChangeText={setQueryName}
                value={queryName}
                placeholder="Scanner Name"
            />
            <TextInput
                onChangeText={setQueryOperation}
                value={queryOperation}
                placeholder="Query Operation"
            />
            <TextInput
                onChangeText={setQueryOperationResult}
                value={queryOperationResult}
                placeholder="Result"
            />
            <Button
                title="Run Search"
                onPress={updateLogs}
            />
          </View>
          <View>
            {
              auditContent.map(log => {
                return(
                  <View key={log.id} style={styles.optionView}>
                      <Text>Scanner Name: {log.scanner_name}</Text>
                      <Text>Scan Type: {log.scan_type}</Text>
                      <Text>Result: {log.scan_result}</Text>
                      <Text>Scanned User Name: {log.scanned_user}</Text>
                      <Text>Scanned User Tag: {log.scanned_user_tag}</Text>
                      <Text>Details: {log.info}</Text>
                      <Text>Time: {log.date_time}</Text>
                  </View>
                );
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  export default AuditLog;