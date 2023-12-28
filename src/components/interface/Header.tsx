import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from '../../constants/Layout';
import {COLORS, FONT} from '../../themes/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFetchProfile} from '../../screens/hooks';
import moment from 'moment';

const Header = () => {
  const insets = useSafeAreaInsets();

  const {data: profileData} = useFetchProfile();

  const currentDate = moment().format('ddd, MMM YYYY');

  return (
    <View style={[styles.container, {paddingTop: insets.top + scale(10)}]}>
      <Text style={styles.name}>
        {profileData?.data?.doctor_data?.full_name}
      </Text>

      <View style={styles.flexContainer}>
        <Ionicons
          name="calendar-outline"
          size={scale(17)}
          color={COLORS.greyText}
        />
        <Text style={styles.date}>{currentDate}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  name: {
    color: COLORS.primary,
    fontSize: scale(14),
    fontWeight: '600',
    fontFamily: FONT.medium,
  },
  date: {
    marginLeft: scale(5),
    color: COLORS.greyText,
    fontWeight: '500',
    fontFamily: FONT.medium,
    fontSize: scale(12),
  },
  flexContainer: {flexDirection: 'row', alignItems: 'center'},
  container: {
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
