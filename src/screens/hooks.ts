import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {
  editSoapNotes,
  fetchLimitedCharts,
  fetchProfile,
  fetchSubscription,
  generateChart,
  getCharts,
  getRefreshToken,
  getSoapNotes,
  login,
  logout,
  signup,
} from '../api';
import {ILogin, ISignup} from './interface';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import isEmpty from 'lodash/isEmpty';

export const useAddSignup = () => {
  const navigation = useNavigation();

  const {mutate: signupMutate, isLoading} = useMutation({
    mutationFn: ({email, password, name}: ISignup) =>
      signup({email, password, name}),
    onSuccess: () => {
      navigation.navigate('Log In');
    },
  });

  return {signupMutate, isLoading};
};

export const useAddLogin = () => {
  const navigation = useNavigation();

  const {signIn} = useAuth();

  const {mutate: loginMutate, isLoading} = useMutation({
    mutationFn: ({email, password}: ILogin) => login({email, password}),
    onSuccess: data => {
      signIn(data?.data?.access_token);
      AsyncStorage.setItem('access_token', data?.data?.access_token);
      AsyncStorage.setItem('refresh_token', data?.data?.refresh_token);
      navigation.navigate('Main');
    },
    onError: error => {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: error as string,
        autoHide: true,
      });
    },
  });

  return {loginMutate, isLoading};
};

export const useFetchRefreshToken = () => {
  const {signOut} = useAuth();
  const {mutateAsync: refreshTokenMutate, isError: isTokenError} = useMutation({
    mutationFn: () => getRefreshToken(),
    onSuccess: data => {
      AsyncStorage.setItem('access_token', data?.data?.access_token);
    },
    onError: error => {
      signOut();
      AsyncStorage.removeItem('access_token');
      AsyncStorage.removeItem('refresh_token');
    },
  });

  return {refreshTokenMutate, isTokenError};
};

export const useGetCharts = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery(
    ['fetch-charts'],
    ({pageParam = 1}) => {
      console.log('pageParam', pageParam);

      return getCharts({
        page: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return !isEmpty(lastPage?.data?.practitioner_list)
          ? allPages?.length + 1
          : null;
      },
    },
  );

  const allData = data
    ? data?.pages?.flatMap(item => item?.data?.practitioner_list)
    : [];

  return {
    data: allData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
};

export const useLogout = () => {
  const {signOut} = useAuth();
  const navigation = useNavigation();
  const {mutateAsync: logoutMutate} = useMutation({
    mutationFn: token => logout(token),
    onMutate: () => {
      signOut();
      AsyncStorage.removeItem('access_token');
      AsyncStorage.removeItem('refresh_token');
    },
    onSuccess: (_, variables) => {
      navigation.navigate('Log In');
    },
  });

  return {logoutMutate};
};

export const useFetchSoapNote = ({id}) => {
  const {data, isLoading} = useQuery(['fetch-soap-note', id], () =>
    getSoapNotes({id}),
  );

  return {
    data,
    isLoading,
  };
};

export const useEditSoapNote = () => {
  const {mutate: editSoapNoteMutate, isLoading: isEditLoading} = useMutation({
    mutationFn: ({id, soap_content}) => editSoapNotes({id, soap_content}),
    onSuccess: data => {
      console.log('data', data);
    },
  });

  return {editSoapNoteMutate};
};

export const useFetchProfile = () => {
  const {data, isLoading} = useQuery(['fetch-profile'], () => fetchProfile());

  return {
    data,
    isLoading,
  };
};

export const useGetLimitedCharts = () => {
  const {data: limitedCharts, isLoading: isChartsLoading} = useQuery(
    ['fetch-limited-charts'],
    () => fetchLimitedCharts(),
  );

  const allData = limitedCharts?.data?.practitioner_list;

  return {
    limitedCharts: allData,
    isChartsLoading,
  };
};

export const useFetchSubscription = () => {
  const {data, isLoading} = useQuery(['fetch-subscription'], () =>
    fetchSubscription(),
  );

  return {
    data,
    isLoading,
  };
};
