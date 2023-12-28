import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {
  black: '#000',
  white: '#fff',
  red: '#C10303',
  primary: '#4B8AF1',
  primaryLight: '#E3EDFF',
  greyText: '#939393',
  mediumGreyText: '#3A3A3A',
  darkGreyText: '#373737',
  placeholder: '#909090',
  borderColor: '#0000001a',
  success: '#4BB543',
  grey: '#787878',
  lightGrey: '#A7A7A7',
  warning: '#f0ad4e',
  devicewidth: width,
  deviceheight: height,
  DeviceWidth: width,
  DeviceHeight: height,
};

const FONT = {
  regular: 'DMSans-Regular',
  medium: 'DMSans-Medium',
  bold: 'DMSans-Bold',
};

export {COLORS, FONT};
