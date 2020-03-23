// import AsyncStorage from '@react-native-community/async-storage';
// import {useApolloClient} from '@apollo/react-hooks';

// export const getUserToken = async () => {
//   const client = useApolloClient();
//   try {
//     // const value = await AsyncStorage.getItem('userToken');
//     // console.log(value);
//     // if (value == null) {
//     // value previously stored
//     client.writeData({data: {token: 'asdasdasd'}});
//     // }
//   } catch (e) {
//     // error reading valuea
//     console.log(e.message);
//   }
// };

import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Button, View, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

const FilterLink = () => {
  const {data, client} = useQuery(GET_VISIBILITY_FILTER);
  console.log(data);
};

export default FilterLink;
