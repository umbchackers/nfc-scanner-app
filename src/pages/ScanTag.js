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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

function ScanTag({navigation, route}) {
  const [manualScan, setManualScan] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalContent, setModalContent] = useState('');

  function handleModal() {
    setModalContent('');
  }

  function ScanUserTag() {
    var nfcTag = readNdef();

    if (nfcTag == undefined){
        setModalContent('Tag is empty');
    }

    searchNFCTag(nfcTag);
  }

  function searchNFCTag(id) {
    firestore()
      .collection('Participants')
      .where('nfcID', '==', id)
      .get().then(querySnapshot => {
          setSelectedUser(querySnapshot.docs[0]);
          if(selectedUser == undefined || selectedUser == null){
            var message = 'No person found with id ' + id.toString();
            setModalContent(message);
          }
      });
  }

  async function readNdef() {
    var nfcTag = '';
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn(
        'Tag found',
        Ndef.text.decodePayload(tag.ndefMessage[0].payload),
      );
        nfcTag = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
    return nfcTag;
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
        <View>
          <Text>Scan Tag</Text>
          <Button
            title="Build Tag"
            onPress={() => {
              navigation.navigate('BuildTag');
            }}
          />
          <Button
            title="Home"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <Button
            title="Audit Log"
            onPress={() => {
              navigation.navigate('AuditLog');
            }}
          />
        </View>
        <Modal
          transparent={true}
          visible={modalContent != ''}
        >
          <Text>{modalContent}</Text>
          <Button
            title = "Close"
            onPress = {handleModal}
          />
        </Modal>
        <Button
          title = "Scan Tag"
          onPress = {ScanUserTag}
        />
        <Text>Or</Text>
        <Button
          title = "Scan Use Manually"
          onPress={setManualScan}
          value = {true}
        />
        {selectedUser != null ?
        <View>
        <Text>First Name: {selectedUser.first}</Text>
        <Text>Last Name: {selectedUser.last}</Text>
        <Text>Email: {selectedUser.email}</Text>
        <Text>Phone Number: {selectedUser.phone}</Text>
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
