import {
  TouchableHighlight,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS, FONT} from '../../themes/themes';
import {scale} from '../../constants/Layout';

type ButtonTypes = {
  name: string;
  type?: string;
  isLoading?: boolean;
  onPress?: () => void;
  size?: 'large' | 'small';
};

export default function Button(props: ButtonTypes) {
  return (
    <TouchableHighlight
      style={[
        {
          width: props.size === 'small' ? '45%' : '100%',
          height: scale(50),
          borderWidth: 1,
          borderRadius: scale(8),
          borderColor: COLORS.primary,
          backgroundColor:
            props.type === 'secondary' ? COLORS.white : COLORS.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      disabled={props?.isLoading}
      onPress={props.onPress}
      underlayColor={props.type === 'secondary' ? '#00000010' : '#4B8AF190'}>
      {props?.isLoading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: scale(15),
            color: props.type === 'secondary' ? COLORS.primary : COLORS.white,
          }}>
          {props.name}
        </Text>
      )}
    </TouchableHighlight>
  );
}
