import firestore from '@react-native-firebase/firestore';
import NfcTagManager from './NfcTagManager';

class FirebaseManager {
    handleQuerySearch(queryFirstName, queryLastName, queryEmail, queryPhone, queryTagNumber = '') {
        return new Promise((resolve) => {
            data = null;
            if (queryFirstName != '' && queryLastName != '' && queryEmail != '' && queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '' && queryLastName != '' && queryEmail != '' && queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
                .get()
            } else if (queryFirstName != '' && queryLastName != '' && queryEmail != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '' && queryLastName != '' && queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '' && queryEmail != '' && queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryLastName != '' && queryEmail != '' && queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '' && queryLastName != '' && queryEmail != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase())
                .get()
            } else if (queryFirstName != '' && queryLastName != '' && queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('phone', '==', queryPhone)
                .get()
            } else if (queryFirstName != '' && queryLastName != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase()).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '' && queryEmail != '' && queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
                .get()
            } else if (queryFirstName != ''&& queryEmail != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '' && queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryLastName != '' && queryEmail != '' && queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
                .get()
            } else if (queryLastName != '' && queryEmail != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase()).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryLastName != '' && queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase()).where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryEmail != '' && queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '' && queryLastName != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('last', '==', queryLastName.toLowerCase())
                .get()
            } else if (queryFirstName != '' && queryEmail != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('email', '==', queryEmail.toLowerCase())
                .get()
            } else if (queryFirstName != '' && queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('phone', '==', queryPhone)
                .get()
            } else if (queryFirstName != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase()).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryLastName != '' && queryEmail != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase()).where('email', '==', queryEmail.toLowerCase())
                .get()
            } else if (queryLastName != '' && queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase()).where('phone', '==', queryPhone)
                .get()
            } else if (queryLastName != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase()).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryEmail != '' && queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('email', '==', queryEmail.toLowerCase()).where('phone', '==', queryPhone)
                .get()
            } else if (queryEmail != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('email', '==', queryEmail.toLowerCase()).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryPhone != '' && queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('phone', '==', queryPhone).where('nfcID', '==', queryTagNumber)
                .get()
            } else if (queryFirstName != '') {
                data = firestore()
                .collection('Participants')
                .where('first', '==', queryFirstName.toLowerCase())
                .get()
            } else if (queryLastName != '') {
                data = firestore()
                .collection('Participants')
                .where('last', '==', queryLastName.toLowerCase())
                .get()
            } else if (queryEmail != '') {
                data = firestore()
                .collection('Participants')
                .where('email', '==', queryEmail.toLowerCase())
                .get()
            } else if (queryPhone != '') {
                data = firestore()
                .collection('Participants')
                .where('phone', '==', queryPhone)
                .get()
            } else if (queryTagNumber != '') {
                data = firestore()
                .collection('Participants')
                .where('nfcID', '==', queryTagNumber)
                .get()
            } else {
                data = 'No query provided.';
            }
            resolve(data);
        });
    }

    searchAuditLogs(queryName, queryOperation, queryOperationResult) {
        return new Promise((resolve) => {
          if(queryName != '' && queryOperation != '' && queryOperationResult != '') {
            firestore()
            .collection('Audit Log')
              .where('scanner_name', '==', queryName.toLowerCase()).where('operation', '==', queryOperation.toLowerCase()).where('result', '==', queryOperationResult.toLowerCase())
              .orderBy('date_time')
              .limit(50)
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
          } else if(queryName != '' && queryOperation != '') {
            firestore()
            .collection('Audit Log')
              .where('scanner_name', '==', queryName.toLowerCase()).where('operation', '==', queryOperation.toLowerCase())
              .orderBy('date_time')
              .limit(50)
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
          } else if(queryName != '' && queryOperationResult != '') {
            firestore()
            .collection('Audit Log')
              .where('scanner_name', '==', queryName.toLowerCase()).where('result', '==', queryOperationResult.toLowerCase())
              .orderBy('date_time')
              .limit(50)
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
          } else if(queryOperation != '' && queryOperationResult != '') {
            firestore()
            .collection('Audit Log')
              .where('operation', '==', queryOperation.toLowerCase()).where('result', '==', queryOperationResult.toLowerCase())
              .orderBy('date_time')
              .limit(50)
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
          } else if(queryOperationResult != '') {
            firestore()
            .collection('Audit Log')
              .where('result', '==', queryOperationResult.toLowerCase())
              .orderBy('date_time')
              .limit(50)
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
          } else if(queryOperation != '') {
            firestore()
            .collection('Audit Log')
              .where('operation', '==', queryOperation.toLowerCase())
              .orderBy('date_time')
              .limit(50)
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
          } else if(queryName != '') {
            firestore()
            .collection('Audit Log')
              .where('scanner_name', '==', queryName.toLowerCase())
              .orderBy('date_time')
              .limit(50)
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
          } else {
            firestore()
            .collection('Audit Log')
              .limit(50)
              .orderBy('date_time')
              .get().then(collectionSnapshot => {
                resolve(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));  
              })
            }
        });
      }

    acquireNewestID() {
        return new Promise(async (resolve) => {
            id = null;
            docRef = await firestore()
                    .collection('Tools')
                    .doc('nfcID')
                    .get()
                    .then(docSnapshot => {
                        id = docSnapshot.data();
                        resolve(id.latestID);
                    })
        })
    }

    updateNewestID(id, setModalContent) {
        return new Promise(async (resolve) => {
            var result = false;
            var number = Number(id) + 1;
            await firestore()
                .collection('Tools')
                .doc('nfcID')
                .set({
                    latestID: number.toString()
                }).then(() => {
                    result = true;
                }, () => {
                    var error = 'Failed to update New Id on firestore.';
                    setModalContent(error);
                    result = false;
                });
             resolve(result);   
        });
    }

    storeNFCID(id, tagNumber) {
        return new Promise(async (resolve) => {
            error = 'No Error'
            await firestore()
                .collection('Participants')
                .doc(id)
                .update({
                    'nfcID': tagNumber,
                    'participation.attending': true,
                }).then(() => {
                    resolve(error);
                }, () => {
                    error = 'Failed to store id to database.';
                    resolve(error);
                });
        });
    }

    searchNFCTag(id) {
        return new Promise((resolve) => {
          firestore()
            .collection('Participants')
            .where('nfcID', '==', id)
            .get().then(async querySnapshot => {
                    if(querySnapshot.size != 0){
                        let documentSnapshot = querySnapshot.docs[0].data();
                        userProfile = documentSnapshot;
                        userProfile.id = querySnapshot.docs[0].id;
                    resolve(userProfile);
                    } else {
                        resolve(false);
                    }
            }, () => {
                resolve(false);
            });
        });
      }

    submitUserChanges(selectedUser) {
        return new Promise((resolve) => {
            firestore()
                .collection('Participants')
                .doc(selectedUser.id)
                .update({
                    'participation.attending': selectedUser.participation.attending,
                    'participation.food.breakfast': selectedUser.participation.food.breakfast,
                    'participation.food.dinner': selectedUser.participation.food.dinner,
                    'participation.food.first_lunch': selectedUser.participation.food.first_lunch,
                    'participation.food.midnight_snack': selectedUser.participation.food.midnight_snack,
                    'participation.food.second_lunch': selectedUser.participation.food.second_lunch,
                    'participation.workshops.workshop1': selectedUser.participation.workshops.workshop1,
                    'participation.workshops.workshop2': selectedUser.participation.workshops.workshop2,
                    'participation.workshops.workshop3': selectedUser.participation.workshops.workshop3,
                    'participation.workshops.workshop4': selectedUser.participation.workshops.workshop4,
                    'participation.workshops.workshop5': selectedUser.participation.workshops.workshop5,
                    'participation.workshops.workshop6': selectedUser.participation.workshops.workshop6,
                    'participation.workshops.workshop7': selectedUser.participation.workshops.workshop7,
                    'participation.workshops.workshop8': selectedUser.participation.workshops.workshop8,
                    'participation.workshops.workshop9': selectedUser.participation.workshops.workshop9,
                })
                .then(() => {
                    resolve('User Succesfully Updated.');
                }, (er) => {
                    resolve('Failed to update User: ' + er);
                });
        });
    }

    async logBuildEvent(scanType, result, scannerName, scannedUser = 'Unknown', details = 'None') {
        const today = new Date();
        const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
        const date = daylist[today.getDay()] + ", " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var scannedUserName = scannedUser;
        var scannedUserTag = scannedUser;
        if(scannedUser != 'Unknown') {
            scannedUserName = scannedUser.first + " " + scannedUser.last;
            scannedUserTag = scannedUser.hasOwnProperty('nfcID') ? scannedUser.nfcID : 'Unknown';
        }

        await firestore()
            .collection('Audit Log')
            .add({
                scan_type: scanType,
                scan_result: result,
                scanner_name: scannerName,
                scanned_user: scannedUserName,
                scanned_user_tag: scannedUserTag,
                info: details,
                date_time: date,
            });
    }

    logUserIn(email, password, setUserProfile) {
        return new Promise((resolve) => {
            email = email.trim()
            password = password.trim();
            firestore()
                .collection('Staff Info')
                .where('email', '==', email.toLowerCase()).where('password', '==', password.toLowerCase())
                .get().then(collectionSnapshot => {
                    if(collectionSnapshot.size == 0) {
                        resolve(false);
                    } else {
                        setUserProfile(collectionSnapshot.docs[0].data())
                        resolve(true);
                    }
            });
        });
    }
}

export default new FirebaseManager();