import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FireBase
import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { useNetInfo }from '@react-native-community/netinfo';

import { Chat } from './components/Chat';
import { Start } from './components/Start';
import { useEffect } from 'react';

export default function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyD7_QjNffE5BprtcWp32Ed80Si5O3uRGCY",
        authDomain: "chatapp-ac727.firebaseapp.com",
        projectId: "chatapp-ac727",
        storageBucket: "chatapp-ac727.appspot.com",
        messagingSenderId: "883934299109",
        appId: "1:883934299109:web:f6ea088af6bafdb7e7250c",
        measurementId: "G-RRNS54Y8NW"
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);

    const Stack = createNativeStackNavigator();

    const connectionStatus = useNetInfo();
    useEffect(() => {
        if (connectionStatus.isConnected) {
            enableNetwork(db);
        } else {
            disableNetwork(db);
        }
    }, [connectionStatus.isConnected])

    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Chat">
                    {props => <Chat db={db} storage={storage} isConnected={connectionStatus.isConnected} {...props}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
    }

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
