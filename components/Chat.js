import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

export const Chat = ({ route, navigation, db }) => {
    const { username, bgColor, userID } = route.params;
    const [messages, setMessages] = useState([]);
    const collectionName = "messages";

    useEffect(() => {
        navigation.setOptions({ title: username });

        const qCollect = query(collection(db, collectionName), orderBy("createdTime", "desc"));
        const unsubChat = onSnapshot(qCollect, (chatData) => {
            let newList = [];
            chatData.forEach(mesg => {
                let newItem = {
                    ...mesg.data(),
                    createdAt: new Date(mesg.data().createdTime.seconds*1000)
                };
                newList.push(newItem);
            })
            setMessages(newList);
        })
        return () => {
            if (unsubChat) unsubChat();
        }
    }, []);

    const onSend = async (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        let newItem = {
            ...newMessages[0],
            createdTime: new Date()
        }
        console.log(newItem);
        await addDoc(collection(db, collectionName), newItem);
    }

    return (<View style={{ flex: 1 }}>
        <GiftedChat
            renderBubble={renderBubble}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: userID,
                name: username
            }}
        />
        { Platform.OS === 'android' || Platform.OS === 'ios' ?
            <KeyboardAvoidingView behavior="height" /> : null }
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
      textStyle={{
        right: {
            color: "green"
        },
        left: {
            color: "red"
        }
      }}
    />
}