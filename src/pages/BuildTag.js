import React, { useState } from 'react';
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
  Modal,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FirebaseManager from '../FirebaseManager';
import NfcTagManager from '../NfcTagManager';
import styles from '../assets/StyleSheets';

function BuildTag( {route, navigation} ) {
  
    const userProfile = route.params;
    const [queryFirstName, setQueryFirstName] = useState('');
    const [queryLastName, setQueryLastName] = useState('');
    const [queryEmail, setQueryEmail] = useState('');
    const [queryPhone, setQueryPhone] = useState('');
    const [foundOptions, setFoundOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalContent, setModalContent] = useState('');
    const [lockTagReady, setLockTagReady] = useState(false);

    function handleModal() {
        setModalContent('');
        setSelectedOption(null);
        setLockTagReady(false);
    }

    function handleOptionSelect(option) {
        setSelectedOption(option);
        setModalContent('User Selected: ');
    }

    async function beginQuerySearch(){
        collectionSnapshot = await FirebaseManager.handleQuerySearch(queryFirstName, queryLastName, queryEmail, queryPhone)
        
        if(collectionSnapshot == 'No query provided.') {
            setModalContent(collectionSnapshot);
        } else if(collectionSnapshot == null){
            text = 'Failed to acquire query results.';
            setModalContent(text);
        } else if(collectionSnapshot.size <= 15) {
            var text ='Found ' + collectionSnapshot.size + ' available users'
            setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            setModalContent('');
        } else {
            var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
            setModalContent(text);
        }
    }

    async function checkNFCTag() {
        return await new Promise(async (resolve) => {
            var message = '';
            setModalContent("Awaiting Scan to check tag...");
            message = await NfcTagManager.readNdef();
            if(message != ''){
                message = 'This NFC Tag already has content: ' + message;
                setModalContent(message);
            }
            else {
                message = 'This NFC Tag is blank.';
                setModalContent(message);
            }
    });
    }

    async function handleLockTag() {
        error = await NfcTagManager.lockNFCTag(setModalContent);

        if(error == 'No Error'){
            //logBuildEvent()
            setSelectedOption(null);
            setLockTagReady(false);
            setModalContent("");
            setQueryFirstName('');
            setQueryLastName('');
            setQueryEmail('');
            setQueryPhone('');
            return;
        } else {
            setModalContent(error);
        }
    }

    async function handleBuildNFC() {
        
        const tagNumber = await FirebaseManager.acquireNewestID();
        
        result = await FirebaseManager.updateNewestID(tagNumber, setModalContent);

        if(tagNumber == null || !result) {
            if(tagNumber == null) {
                message = 'Failed to acquire new ID from the server.';
                setModalContent(message);
            } else if (!result) {
                message = 'Failed to update new ID to the server';
                setModalContent(message);
            }
            FirebaseManager.logBuildEvent('build', 'fail', userProfile.username, selectedOption, message);
            setSelectedOption(null);
            return;
        }

        error = await NfcTagManager.writeTagID(tagNumber, setModalContent);

        if(error != 'No Error') {
            FirebaseManager.logBuildEvent('build', 'fail', userProfile.username, selectedOption, error);
            setSelectedOption(null);
            return;
        }

        error = await FirebaseManager.storeNFCID(selectedOption.id, tagNumber);

        if(error != 'No Error'){
            FirebaseManager.logBuildEvent('build', 'fail', userProfile.username, selectedOption, error);
            setModalContent(error)
            setSelectedOption(null);
            return;
        } else{
            selectedOption.nfcID = tagNumber;
            FirebaseManager.logBuildEvent('build', 'success', userProfile.username, selectedOption, error);
            setFoundOptions([]);
            setLockTagReady(true);
            setModalContent('Tag Succesfully Built.');  
            setQueryFirstName('');
            setQueryLastName('');
            setQueryEmail('');
            setQueryPhone('');
        }
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
                  title="Audit Log"
                  onPress={() => {navigation.navigate('AuditLog', { username: userProfile.username })}}
              />
            </View>
          <View>
            <Button 
                title="Check NFC Tag"
                onPress={checkNFCTag}
            />
            <Modal
                transparent={true}
                visible={modalContent != ''}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                        selectedOption == null ?
                        <View>
                            <Text style={styles.modalText}>{modalContent}</Text>
                            <Button
                                title="Close"
                                onPress={handleModal}
                            />
                        </View> : lockTagReady ?
                        <View>
                            <Text style={styles.modalText}>{modalContent}</Text>
                            <Text style={styles.modalText}>Name: {selectedOption.first} {selectedOption.last}</Text>
                            <Text style={styles.modalText}>Email: {selectedOption.email}</Text>
                            <Text style={styles.modalText}>Phone: {selectedOption.phone}</Text>
                            <Button
                                title="Lock Tag"
                                onPress={handleLockTag}
                            />
                            <Button
                                title="Close"
                                onPress={handleModal}
                            />
                        </View> : selectedOption.underage?
                        <View>
                            <Text>-------</Text>
                            <Text>THIS PERSON IS UNDER AGE</Text>
                            <Text>-------</Text>
                            <Text style={styles.modalText}>{modalContent}</Text>
                            <Text style={styles.modalText}>Name: {selectedOption.first} {selectedOption.last}</Text>
                            <Text style={styles.modalText}>Email: {selectedOption.email}</Text>
                            <Text style={styles.modalText}>Phone: {selectedOption.phone}</Text>
                            <Text>-------</Text>
                            <Text>THIS PERSON IS UNDER AGE</Text>
                            <Text>-------</Text>
                            <Button
                                title="Scan Tag"
                                onPress={handleBuildNFC}
                            />
                            <Button
                                title="Close"
                                onPress={handleModal}
                            />
                        </View> :
                        <View>
                            <Text style={styles.modalText}>{modalContent}</Text>
                            <Text style={styles.modalText}>Name: {selectedOption.first} {selectedOption.last}</Text>
                            <Text style={styles.modalText}>Email: {selectedOption.email}</Text>
                            <Text style={styles.modalText}>Phone: {selectedOption.phone}</Text>
                            <Button
                                title="Scan Tag"
                                onPress={handleBuildNFC}
                            />
                            <Button
                                title="Close"
                                onPress={handleModal}
                            />
                        </View>
                        }
                    </View>
                </View>
            </Modal>
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
                <Button
                    title="Run Search"
                    onPress={beginQuerySearch}
                />
            </View>
          </View>
          {foundOptions.map(option => {
            const text = option.first + " " + option.last + ", Email: " + option.email
            return(
                <View key={option.id} style={styles.optionView}>
                    <Button style={styles.modalText}
                    title={text}
                    onPress={() => handleOptionSelect(option)}
                    />
                </View>
            );
          })}
          {selectedOption != null ? <Text>{selectedOption.first} {selectedOption.last}, {selectedOption.email}</Text> : null}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default BuildTag;