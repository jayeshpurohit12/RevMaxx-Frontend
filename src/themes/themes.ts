
import { Dimensions, Platform } from 'react-native'


const iOS = Platform.OS === 'ios'
const { width, height } = Dimensions.get('window')

const COLORS = {
    
    black: '#000',
    white: '#fff',
    red: '#C10303',
    primary: '#4B8AF1',
    primaryLight: '#E3EDFF',
    greyText: '#939393',
    mediumGreyText: '#3A3A3A',
    darkGreyText: '#373737',
    devicewidth: width,
    deviceheight: height,
    DeviceWidth: width,
    DeviceHeight : height,
};

const FONT = {
    regular: 'DMSans-Regular',
    medium: 'DMSans-Medium',
    bold: 'DMSans-Bold'
};

export { COLORS, FONT };