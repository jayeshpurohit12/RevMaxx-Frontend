import {TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../themes/themes';
import React, {ReactNode} from 'react';

type CardTypes = {
  content: ReactNode;
  type: 'small' | 'large';
  onPress?: () => void;
};

export default function Card(props: CardTypes) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        style.cardStyle,
        props.type === 'small' ? style.smallCard : style.largeCard,
      ]}>
      {props.content}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'white',

    // height:1,
    padding: 20,
    elevation: 1,
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    // shadowColor:'red',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    gap: 15,
  },
  smallCard: {
    width: '48%',
  },
  largeCard: {
    width: '100%',
  },
});
