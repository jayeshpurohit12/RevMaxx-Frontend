import { View, Text, Image, StyleSheet, PermissionsAndroid } from 'react-native'
import Button from '../components/shared/Button'
import { COLORS, FONT } from '../themes/themes'

export default function PermissionMic({ navigation }: { navigation: any }) {

    const reqMicPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the mic');
                navigation.navigate('Permission Cam');
            } else {
                console.log('Mic permission denied');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Image
                source={require('../assets/images/imgs/PermisionMicImg.png')}
            />
            <View style={{
                width: '100%',
                gap: 24
            }}>
                <Text style={styles.titleText}>
                    Microphone access is required for the app to work
                </Text>
                <Button
                    name={`Request Microphone Permission`}
                    type={'primary'}
                    onPress={reqMicPermission}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: FONT.medium,
        fontSize: 20,
        color: COLORS.mediumGreyText,
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: 10
    }
})