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
import firestore from '@react-native-firebase/firestore';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
function Home( {navigation, route} ) {
  
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
            <Text>Home</Text>
            <Button
                title="Build Tag"
                onPress={() => {navigation.navigate('BuildTag')}}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

// {postLists.map((post) => {
//     return (
//       <View>
//       <Text>{post.title}</Text>
//       <Text>{post.postText}</Text>
//       </View>
//     );
//   })}

//   const [postLists, setPostList] = useState([]);

// function onAddPost() {
//     console.log('attempting mobile write...');
//     firestore()
//     .collection('posts')
//     .doc()
//     .set({
//         postText: 'First attempt at mobile writing',
//         title: 'Mobile Writing'
//     })
//     .then(() => {
//         console.log('Success!!');
//     }, (error) => {
//         console.error(error);
//     })
// }

//   useEffect(() => {
//     firestore()
//     .collection('posts')
//     .get()
//     .then(collectionSnapshot => {
//         console.log('Total users: ', collectionSnapshot.size);
//         collectionSnapshot
//             .forEach(documentSnapshot => {
//                 console.log('User ID: ', documentSnapshot.id,
//                     documentSnapshot.data());
//             });
//         setPostList(collectionSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
//     });
//   }, [])  