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
  Modal,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

function BuildTag( {navigation, route} ) {
  
    const [queryFirstName, setQueryFirstName] = useState('');
    const [queryLastName, setQueryLastName] = useState('');
    const [queryEmail, setQueryEmail] = useState('');
    const [queryPhone, setQueryPhone] = useState('');
    const [foundOptions, setFoundOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalContent, setModalContent] = useState('');
    const [confirmRewrite, setConfirmRewrite] = useState(true);

    function handleModal() {
        setModalContent('');
    }

    function handleOptionSelect(option) {
        setSelectedOption(option);
        setModalContent('User Selected: ');
    }

    //firebase function
    function handleQuerySearch() {
        if (queryFirstName != '' && queryLastName != '' && queryEmail != '' && queryPhone != '') {
            setQueryFirstName(queryFirstName.toLowerCase()); setQueryLastName(queryLastName.toLowerCase()); setQueryEmail(queryEmail.toLowerCase());
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text ='Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryFirstName != '' && queryLastName != '' && queryEmail != '') {
            setQueryFirstName(queryFirstName.toLowerCase()); setQueryLastName(queryLastName.toLowerCase()); setQueryEmail(queryEmail.toLowerCase);
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase())
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryFirstName != '' && queryLastName != '' && queryPhone != '') {
            setQueryFirstName(queryFirstName.toLowerCase()); setQueryLastName(queryLastName.toLowerCase());
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryFirstName != '' && queryEmail != '' && queryPhone != '') {
            setQueryFirstName(queryFirstName.toLowerCase()); setQueryEmail(queryEmail.toLowerCase);
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryLastName != '' && queryEmail != '' && queryPhone != '') {
            setQueryLastName(queryLastName.toLowerCase()); setQueryEmail(queryEmail.toLowerCase);
            firestore()
            .collection('Participants')
            .where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryFirstName != '' && queryLastName != '') {
            setQueryFirstName(queryFirstName.toLowerCase()); setQueryLastName(queryLastName.toLowerCase());
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase())
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryFirstName != '' && queryEmail != '') {
            setQueryFirstName(queryFirstName.toLowerCase()); setQueryEmail(queryEmail.toLowerCase);
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase()).where('email', '==', queryEmail.toLowerCase())
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryFirstName != '' && queryPhone != '') {
            setQueryFirstName(queryFirstName.toLowerCase());
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase()).where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryLastName != '' && queryEmail != '') {
            setQueryLastName(queryLastName.toLowerCase()); setQueryEmail(queryEmail.toLowerCase);
            firestore()
            .collection('Participants')
            .where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase())
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryLastName != '' && queryPhone != '') {
            setQueryLastName(queryLastName.toLowerCase());
            firestore()
            .collection('Participants')
            .where('last', '==', queryLastName.toLowerCase()).where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryEmail != '' && queryPhone != '') {
            setQueryEmail(queryEmail.toLowerCase);
            firestore()
            .collection('Participants')
            .where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryFirstName != '') {
            setQueryFirstName(queryFirstName.toLowerCase());
            firestore()
            .collection('Participants')
            .where('first', '==', queryFirstName.toLowerCase())
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryLastName != '') {
            setQueryLastName(queryLastName.toLowerCase());
            firestore()
            .collection('Participants')
            .where('last', '==', queryLastName.toLowerCase())
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryEmail != '') {
            setQueryEmail(queryEmail.toLowerCase);
            firestore()
            .collection('Participants')
            .where('email', '==', queryEmail.toLowerCase())
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else if (queryPhone != '') {
            firestore()
            .collection('Participants')
            .where('phone', '==', queryPhone)
            .get().then(collectionSnapshot => {
                if(collectionSnapshot.size <= 15) {
                    var text = 'Found ' + collectionSnapshot.size + ' available users'
                    setFoundOptions(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
                    setModalContent(text);
                } else {
                    var text = 'Found ' + collectionSnapshot.size + ' available users, please narrow search with more criteria'
                    setModalContent(text);
                }
            })
        } else {
            setModalContent('No query provided.');
        }
    }

    //firebase function
    function getNFCID(documentSnapshot) {
        var id = documentSnapshot.get('latestID');
        return id;
    }

    //firebase function
    function updateNewestID(id) {
        var result = false;
        var number = Number(id) + 1;
        firestore()
            .collection('Tools')
            .doc('nfcID')
            .set({
                latestID: number.toString()
            }).then(() => {
                writeTagID(id) 
            }, () => {
                var error = 'Failed to update New Id on firestore.';
                setModalContent(error);
                setSelectedOption(null);
            });
    }

    //firebase function
    function acquireNewestID() {
        setConfirmRewrite(false);
        firestore()
            .collection('Tools')
            .doc('nfcID')
            .get()
            .then(documentSnapshot => getNFCID(documentSnapshot))
            .then(latestID => {
                const id = latestID;
                console.log(id + '\n object type:' + typeof id);
                updateNewestID(id);
            }, () => {
                var error ='Failed to acquire New Id from firestore.';
                setModalContent(error);
                setSelectedOption(null);
            })
    }

    //firebase function
    function storeNFCID(id) {
        firestore()
            .collection('Participants')
            .doc(selectedOption.id)
            .update({
                'nfcID': id,
            }).then(() => {
                var error = 'Tag Scanned Succesfully!'
                setModalContent(error);
                setSelectedOption(null);
            }, () => {
                var error = 'Failed to store id to NFC Tag.'
                setModalContent(error);
                setSelectedOption(null);
            });
    }

    //nfc function
    async function writeTagID(id) {
        var nfcID = id;
        var error = 'No Error';

        if(nfcID == '' || nfcID == null) {
            setModalContent('Failed to retrieve newest ID from database.');
            setSelectedOption(null);
            //logBuildEvent();
        }

        let result = false;
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const bytes = Ndef.encodeMessage([Ndef.textRecord(nfcID)]);

            if(bytes) {
                await NfcManager.ndefHandler
                .writeNdefMessage(bytes)
                result = true
                setSelectedOption(null);
                setModalContent('Scanned Successfully');
                await NfcManager.ndefHandler
                .makeReadOnly()
            } else {
                error = 'Failed to encode tag ID.';
                setModalContent(error);
                setSelectedOption(null);
            }
        } catch (ex) {
            error = 'NFC Scan Failed: ' + ex ;
            setModalContent(error);
            setSelectedOption(null);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }

        storeNFCID(id);
    }

    //nfc function
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

    function checkNFCTag() {
        var message = readNdef();
        if(message.length == 6 && !isNaN(message)){
            setModalContent('This NFC Tag already has an ID, push Scan Tag again to rewrite.');
            setConfirmRewrite(true);
        }
        else {
            acquireNewestID();
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
          <View>
            <Text>Build Tag</Text>
            <Button
                title="Home"
                onPress={() => {navigation.navigate('Home')}}
            />
            <Button
                title="Scan Tag"
                onPress={() => {navigation.navigate('ScanTag')}}
            />
            <Button
                title="Audit Log"
                onPress={() => {navigation.navigate('AuditLog')}}
            />
          </View>
          <View>
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
                        </View> : 
                        confirmRewrite == false ?
                        <View>
                            <Text style={styles.modalText}>{modalContent}</Text>
                            <Text style={styles.modalText}>Name: {selectedOption.first} {selectedOption.last}</Text>
                            <Text style={styles.modalText}>Email: {selectedOption.email}</Text>
                            <Text style={styles.modalText}>Phone: {selectedOption.phone}</Text>
                            <Button
                                title="Scan Tag"
                                onPress={checkNFCTag}
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
                                onPress={acquireNewestID}
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
                onPress={handleQuerySearch}
            />
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

  const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
    },
    modalText: {
        color: "black"
    },
    optionView: {
        marginTop: 10,
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
    }
  })
  
  export default BuildTag;