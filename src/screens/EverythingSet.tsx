import { useState } from 'react'
import { View, Text, Image, StyleSheet, PermissionsAndroid } from 'react-native'
import Button from '../components/shared/Button'
import { FONT, COLORS } from '../themes/themes'

export default function EverythingIsSet({ navigation }: { navigation: any }) {

    // Store Camera and Mic Permissions
    const [micPermission, setMicPermission] = useState(false);
    const [camPermission, setCamPermission] = useState(false);

    // Check Camera and Mic Permissions
    const checkPermissions = async () => {
        const micStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        const camStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        setMicPermission(micStatus ? true : false);
        setCamPermission(camStatus ? true : false);
    }
    checkPermissions();

    return (
        <>
            <Image
                source={require('../assets/images/imgs/EverythingSetImg.png')}
            />
            <View
                style={{
                    width: '100%',
                    gap: 24
                }}
            >
                <Text style={styles.titleText}>
                    Everything is set!
                </Text>
                <View
                    style={{
                        gap: 12,
                    }}
                >
                    {['Microphone Permissions', 'Camera Permissions'].map((item, index) => (
                        <View
                            key={index}
                            style={styles.boxView}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 12,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: COLORS.primaryLight,
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Image
                                        source={item === 'Microphone Permissions' ? require('../assets/images/icons/microphone.png') : require('../assets/images/icons/camera.png')}
                                    />
                                </View>
                                <Text
                                    style={{
                                        fontFamily: FONT.regular,
                                        fontSize: 16,
                                        color: COLORS.mediumGreyText
                                    }}
                                >
                                    {item}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: COLORS.primary,
                                    padding: 1
                                }}
                            >
                                {item === 'Microphone Permissions' ?
                                    micPermission && <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/icons/Tick.png')} />
                                    :
                                    camPermission && <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/icons/Tick.png')} />
                                }
                            </View>
                        </View>
                    ))}
                </View>
                <Button
                    name={`Next`}
                    type={'primary'}
                    onPress={() => navigation.navigate('Log In')}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: FONT.bold,
        fontSize: 24,
        color: COLORS.darkGreyText,
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: 10
    },
    boxView: {
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})