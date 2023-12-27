import axios from 'axios';
import {IGetChart, ILogin, ISignup} from '../screens/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = 'http://35.153.66.203';

export const signup = async ({name, email, password}: ISignup) => {
  try {
    const res = await axios.post(`${api}/signup`, {
      full_name: name,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({email, password}: ILogin) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`${api}/login`, {
        email,
        password,
      });

      resolve(res.data);
    } catch (error) {
      reject(reject(error?.response?.data?.message));
    }
  });
};

export const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refresh_token');
  console.log(refreshToken, 'refresh token in api');
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${api}/refresh_token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      resolve(res.data);
    } catch (error) {
      reject(error);
      console.log(error?.response?.data?.message, 'error..');
    }
  });
};

export const getCharts = async ({page, items_per_page = 7}: IGetChart) => {
  const accessToken = await AsyncStorage.getItem('access_token');

  try {
    const res = await axios.get(`${api}/get_charts`, {
      params: {
        page,
        items_per_page,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res.data, 'response in get charts api');

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message, 'error..');
  }
};

export const logout = async token => {
  console.log(token, 'token in api');

  try {
    const res = await axios.delete(`${api}/logout/${token}`);
    console.log(res.data, 'response in logout api');

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message, 'error..');
  }
};

export const generateChart = async formData => {
  console.log(formData, 'form data in api');

  const accessToken = await AsyncStorage.getItem('access_token');
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`${api}/generate_chart`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data, 'response in generate chart api');

      return resolve(res.data);
    } catch (error) {
      reject(error?.response?.data?.message);
      console.log(error?.response?.data?.message, 'error..');
    }
  });
};

export const getSoapNotes = async ({id}) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  try {
    const res = await axios.get(`${api}/get_chart_details/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message, 'error..');
  }
};

export const editSoapNotes = async ({id, soap_content}) => {
  console.log(soap_content, 'form data in api');

  const accessToken = await AsyncStorage.getItem('access_token');
  try {
    const res = await axios.put(
      `${api}/edit_chart/${id}`,
      {soap_content: soap_content},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log(res.data, 'response in edit soap notes api');

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message, 'error..');
  }
};

export const fetchProfile = async () => {
  const accessToken = await AsyncStorage.getItem('access_token');
  try {
    const res = await axios.get(`${api}/get_profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res.data, 'response in fetch profile api');

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message, 'error..');
  }
};

export const fetchLimitedCharts = async () => {
  const accessToken = await AsyncStorage.getItem('access_token');

  try {
    const res = await axios.get(`${api}/get_charts`, {
      params: {
        page: 1,
        items_per_page: 3,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res.data, 'response in get charts api');

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message, 'error..');
  }
};

export const fetchSubscription = async () => {
  const accessToken = await AsyncStorage.getItem('access_token');
  try {
    const res = await axios.get(`${api}/get_user_subscription_status`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res.data, 'response in fetch subscription api');

    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.message, 'error..');
  }
};
