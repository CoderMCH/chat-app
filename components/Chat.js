import { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

export const Chat = ({ route, navigation }) => {
    const { name, bgColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={{...styles.container, backgroundColor: bgColor}}>
            <Text>Hello Chat!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
