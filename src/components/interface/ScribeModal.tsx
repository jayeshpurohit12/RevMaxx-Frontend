import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {scale} from '../../constants/Layout';
import {COLORS, FONT} from '../../themes/themes';
import Lottie from 'lottie-react-native';
import Pulse from '../../assets/json/Pulse.json';

interface IScribingModal {
  isScribing: boolean;
}

export default function ScribeModal({isScribing}: IScribingModal) {
  return (
    <Modal animationType="fade" visible={isScribing} transparent={true}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.pulseContainer}>
            <Lottie source={Pulse} autoPlay loop />
          </View>
          <Text style={styles.scribingText}>Scribing...</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: scale(156),
    width: scale(240),
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    borderRadius: scale(16),
    padding: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pulseContainer: {
    width: scale(60),
    height: scale(60),
    borderWidth: 2,
    borderRadius: scale(50),
    borderColor: COLORS.primary,
  },
  scribingText: {
    fontSize: scale(16),
    marginTop: scale(16),
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
});
