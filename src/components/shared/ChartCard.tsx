import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '../../constants/Layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT} from '../../themes/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChartCard = ({chatDetails}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>Charts-unique124</Text>

        <Text style={styles.billed}>Coded</Text>
      </View>

      <View style={[styles.flexContainer, {marginTop: scale(15)}]}>
        <Ionicons
          name="calendar-outline"
          size={scale(19)}
          color={COLORS.greyText}
        />
        <Text style={styles.date}>Sun, Dec 2023</Text>
      </View>

      <View style={[styles.nameContainer, {marginTop: scale(15)}]}>
        <View style={styles.flexContainer}>
          <Ionicons
            name="time-outline"
            size={scale(19)}
            color={COLORS.greyText}
          />
          <Text style={styles.date}>12:00 PM</Text>
        </View>

        <Text style={[styles.billed, {fontSize: scale(12)}]}>
          Acute Headache
        </Text>
      </View>
    </View>
  );
};

export default ChartCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    marginBottom: scale(10),
    borderRadius: scale(16),
    padding: scale(16),
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginHorizontal: scale(2),
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: scale(13),
    marginLeft: scale(5),
    color: COLORS.mediumGreyText,
    fontFamily: FONT.medium,
    fontWeight: '500',
  },
  date: {
    color: COLORS.greyText,
    fontSize: scale(13),
    marginLeft: scale(5),
    fontFamily: FONT.medium,
    fontWeight: '500',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billed: {
    color: COLORS.greyText,
    fontSize: scale(14),
    fontFamily: FONT.medium,
    fontWeight: '500',
  },
});
