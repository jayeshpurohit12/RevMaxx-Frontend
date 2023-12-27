import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../globalStyles';
import {COLORS, FONT} from '../themes/themes';
import Card from '../components/shared/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {scale} from '../constants/Layout';
import ChartCard from '../components/shared/ChartCard';
import {useGetCharts} from './hooks';
import {useIsFocused} from '@react-navigation/native';

export default function Appointments({navigation}: {navigation: any}) {
  // const [pid, setPid] = useState('');
  // const [docName, setDocName] = useState('');
  // const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  // const [isPopupVisible, setIsPopupVisible] = useState(false);

  const isFocused = useIsFocused();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetCharts();

  const onEndReached = () => {
    console.log(hasNextPage, isFetchingNextPage);

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  // useEffect(() => {
  //   AsyncStorage.getItem('provider_id')
  //     .then(provider_id => {
  //       if (provider_id) {
  //         setPid(provider_id);
  //         // Use the retrieved username here
  //         console.log('Retrieved pid in charts page:', pid);
  //       } else {
  //         // Handle the case where 'username' is not found in AsyncStorage
  //         console.log('provider_id not found in AsyncStorage');
  //       }
  //     })
  //     .catch(error => {
  //       // Handle any errors here
  //       console.error('Error retrieving provider_id:', error);
  //     });

  //   AsyncStorage.getItem('username')
  //     .then(username => {
  //       if (username) {
  //         setDocName(username);
  //         // Use the retrieved username here
  //         console.log('Retrieved username:', username);
  //       } else {
  //         // Handle the case where 'username' is not found in AsyncStorage
  //         console.log('Username not found in AsyncStorage');
  //       }
  //     })
  //     .catch(error => {
  //       // Handle any errors here
  //       console.error('Error retrieving username:', error);
  //     });
  //   axios
  //     .get(
  //       `http://revmaxx.us-east-1.elasticbeanstalk.com/getSoapNotesByPid?provider_id=${pid}`,
  //     )
  //     .then(res => {
  //       console.log(res.data, 'response in charts page');

  //       setChartsData(res.data);
  //     })
  //     .catch(err => console.log(err));
  // }, [pid]);

  type ItemProps = {
    created_at: 'string';
    soapnote: 'string';
  };

  const renderItem = ({item}: {item: ItemProps}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('SoapNote', {
          id: item?.id,
        })
      }>
      <ChartCard chatDetails={item} />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{alignSelf: 'center', marginTop: scale(10)}}
        color={COLORS.primary}
      />
    );
  }

  return (
    <View style={[globalStyles.container, {paddingVertical: scale(15)}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: scale(5)}}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item?.id}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: scale(50),
              }}>
              <Text
                style={{
                  fontFamily: FONT.regular,
                  fontSize: scale(16),
                  color: COLORS.mediumGreyText,
                }}>
                No SOAP Notes found
              </Text>
            </View>
          )}
          ListFooterComponent={() =>
            isRefetching && (
              <ActivityIndicator
                size="large"
                style={{alignSelf: 'center', marginTop: scale(10)}}
              />
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBlue: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.mediumGreyText,
  },

  textGrey: {
    fontFamily: FONT.medium,
    fontSize: 16,
    color: COLORS.greyText,
  },

  textCode: {
    fontFamily: FONT.medium,
    fontSize: 16,
    color: COLORS.primary,
  },
});
