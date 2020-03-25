import AsyncStorage from '@react-native-community/async-storage';

type userTokenType = string;

export const saveUserTokenInAsyncStorage = async (userToken: userTokenType) => {
  try {
    await AsyncStorage.setItem('@picbyUserToken', userToken);
    console.log('user token set in async storage');
  } catch (error) {
    console.log(error);
  }
};

export const getUserTokenFromAsyncStorage = async () => {
  try {
    const userToken = await AsyncStorage.getItem('@picbyUserToken');
    if (userToken !== null) {
      // value previously stored
      console.log('user previously logged in');
      return userToken;
    } else {
      throw new Error();
    }
  } catch (error) {
    return null;
  }
};

export const removeUserTokenFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('@picbyUserToken');
  } catch (error) {
    console.log(error);
  }

  console.log('User token removed');
};
