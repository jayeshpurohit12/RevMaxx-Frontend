import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const retrievedUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
      }
    };
    retrievedUserId();
  }, []);

  const signIn = userId => {
    // If authentication is successful, set the user ID in the state
    setUserId(userId);
    AsyncStorage.setItem('userId', userId);
  };

  const signOut = () => {
    // Perform sign-out logic (e.g., clear user data)
    setUserId(null);
    AsyncStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{userId, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
