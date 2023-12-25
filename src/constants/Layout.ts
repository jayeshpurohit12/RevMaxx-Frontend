import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

const scale = (size: number) => {
  'worklet';

  return (width / guidelineBaseWidth) * size;
};

const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale, width, height};
