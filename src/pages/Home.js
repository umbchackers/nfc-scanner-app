import React, { useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  Image,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import FirebaseManager from '../FirebaseManager';
import styles from '../assets/StyleSheets'

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
function Home( {navigation, route} ) {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setuserProfile] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
            { loggedIn ?
            <View>
              <Text style={styles.navbarHeaderText}>Welcome back, {userProfile.first_name + " " + userProfile.last_name}</Text>
              <View style={styles.navbarView}>
                <Button
                    title="Build Tag"
                    onPress={() => {navigation.navigate('BuildTag', { username: userProfile.first_name + " " + userProfile.last_name })}}
                />
                <Button
                    title="Scan Tag"
                    onPress={() => {navigation.navigate('ScanTag', { username: userProfile.first_name + " " + userProfile.last_name })}}
                />
                <Button
                    title="Audit Log"
                    onPress={() => {navigation.navigate('AuditLog', { username: userProfile.first_name + " " + userProfile.last_name })}}
                />
              </View>
              <Image style={styles.homeLogo} source={require('../assets/Doggo_.png')} />
            </View> :
            <View>
              <Image style={styles.homeLogo} source={require('../assets/Doggo_.png')} />
              <Text style={styles.loginText}>Please login before continuing</Text>
              <View style={styles.loginWindow}>
              <TextInput
                style={styles.loginTextInput}
                onChangeText={setEmail}
                value={email}
                placeholder="First Name"
                placeholderTextColor="#000000"
              />
              <TextInput
                style={styles.loginTextInput}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#000000"
              />
              </View>
              <Button
                style={styles.loginButton}
                title="Login"
                onPress={async () => setLoggedIn(await FirebaseManager.logUserIn(email, password, setuserProfile))}
              />
            </View>
            }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;