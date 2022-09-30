import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Modal,
  TextInput,
  CheckBo
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NfcTagManager from '../NfcTagManager';
import FirebaseManager from '../FirebaseManager';
import styles from '../assets/StyleSheets';

function ScanTag({navigation, route}) {

  const userProfile = route.params;
  const [manualScan, setManualScan] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [queryFirstName, setQueryFirstName] = useState('');
  const [queryLastName, setQueryLastName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryPhone, setQueryPhone] = useState('');
  const [queryTagNumber, setQueryTagNumber] = useState('');
  const [foundOptions, setFoundOptions] = useState([]);

  function handleModal() {
    setModalContent('');
  }

  function toggleManualScanning() {
    setManualScan(!manualScan);
    setSelectedUser(null);
  }

  function handleUpdateSelectedUserFood(name, value) {
    setSelectedUser(prevState => ({
      ...prevState,
      participation: {
        ...prevState.participation,
        food: {
          ...prevState.participation.food,
          [name]: !value
        }
      }
    }));
  }

  function handleUpdateSelectedUserWorkshops(name, value) {
    setSelectedUser(prevState => ({
      ...prevState,
      participation: {
        ...prevState.participation,
        workshops: {
          ...prevState.participation.workshops,
          [name]: !value
        }
      }
    }));
  }

  async function beginQuerySearch() {
    collectionSnapshot = await FirebaseManager.handleQuerySearch(queryFirstName, queryLastName, queryEmail, queryPhone, queryTagNumber)
    
    if(collectionSnapshot == 'No query provided.') {
        setModalContent(collectionSnapshot);
    } else if(collectionSnapshot == null){
        text = 'Failed to acquire query results.';
        setModalContent(text);
    } else if(collectionSnapshot.size <= 15) {
        var text ='Found ' + collectionSnapshot.size + ' available users'
        setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        setModalContent(text);
    } else {
        var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
        setModalContent(text);
    }
  }

  async function handleSubmitInfo() {
    console.log(selectedUser)
    result = await FirebaseManager.submitUserChanges(selectedUser);
    setModalContent(result);
    if(result != 'User Succesfully Updated.') {
      FirebaseManager.logBuildEvent('scan', 'fail', userProfile.username, selectedUser, result);
    }
    else {
      FirebaseManager.logBuildEvent('scan', 'success', userProfile.username, selectedUser, result);
    }
  }

  async function ScanUserTag() {
    setManualScan(false);
    setModalContent("Awaiting Scan to check tag...");
    tag = await NfcTagManager.readNdef();

    if(tag == '' || tag == null || tag == "undefined"){
      setModalContent('This NFC Tag is blank.');
      return;
    }
    result = await FirebaseManager.searchNFCTag(tag);  
    
    if(result == false){
      setModalContent('No profile found from this tag.');
      return;
    }

    setSelectedUser(result);
    setModalContent("Profile Found.");
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
                title="Build Tag"
                onPress={() => {navigation.navigate('BuildTag', { username: userProfile.username })}}
            />
            <Button
                title="Audit Log"
                onPress={() => {navigation.navigate('AuditLog', { username: userProfile.username })}}
            />
        </View>
        <Modal
              transparent={true}
              visible={modalContent != ''}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalContent}</Text>
              <Button
                title = "Close"
                onPress = {handleModal}
              />
            </View>
          </View>
        </Modal>
        <Button
          title = "Scan Tag"
          onPress = {ScanUserTag}
        />
        <Text style={styles.modalText}>Or</Text>
        <Button
          title = "Scan User Manually"
          onPress={toggleManualScanning}
        />
        {manualScan ?
        <View style={styles.queryView}>
          <TextInput
                onChangeText={setQueryFirstName}
                value={queryFirstName}
                placeholder="First Name"
            />
            <TextInput
                onChangeText={setQueryLastName}
                value={queryLastName}
                placeholder="Last Name"
            />
            <TextInput
                onChangeText={setQueryEmail}
                value={queryEmail}
                placeholder="Email Address"
            />
            <TextInput
                onChangeText={setQueryPhone}
                value={queryPhone}
                placeholder="Phone Number (No dashes or spaces)"
            />
            <TextInput
                onChangeText={setQueryTagNumber}
                value={queryTagNumber}
                placeholder="Tag Number"
            />
            <Button
                title="Run Search"
                onPress={beginQuerySearch}
            />
            {foundOptions.map(option => {
            const text = option.first + " " + option.last + ", Email: " + option.email
            return(
                <View key={option.id} style={styles.optionView}>
                    <Button style={styles.modalText}
                    title={text}
                    onPress={() => {setSelectedUser(option); setFoundOptions([]); setManualScan(false);}}
                    />
                </View>
            );
          })}
        </View> :
        <View>

        </View>}
        {selectedUser != null ?
        <View>
          <Text>First Name: {selectedUser.first}</Text>
          <Text>Last Name: {selectedUser.last}</Text>
          <Text>Email: {selectedUser.email}</Text>
          <Text>Phone Number: {selectedUser.phone}</Text>
          <Text>Tag Number: {selectedUser.nfcID}</Text>
          <View>
            <Text>attending <CheckBox 
              disabled = {false}
              value = {selectedUser.participation.attending}
              onValueChange = {() => setSelectedUser(prevState => ({
                ...prevState,
                participation: {
                  ...prevState.participation,
                  attending: !prevState.participation.attending
                }
              }))
            }
            /></Text>
            {
              Object.keys(selectedUser.participation.food).map((key) => {
                let value = selectedUser.participation.food[key]
                return(
                  <View key={key}>
                    <Text>{key}
                    <CheckBox
                      disabled = {false}
                      value = {value}
                      onValueChange = {() => handleUpdateSelectedUserFood(key, value)}
                    />
                    </Text>
                  </View>
                );
            })
            }
            {
              Object.keys(selectedUser.participation.workshops).map((key) => {
                let value = selectedUser.participation.workshops[key]
                return(
                  <View key={key}>
                    <Text>{key}
                    <CheckBox
                      disabled = {false}
                      value = {value}
                      onValueChange = {() => handleUpdateSelectedUserWorkshops(key, value)}
                    />
                    </Text>
                  </View>
                );
            })
            }
            <Button 
            title = "Submit Changes"
            onPress = {() => handleSubmitInfo(selectedUser)}
            />
          </View>
        </View>
        :
        <View>

        </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default ScanTag;
