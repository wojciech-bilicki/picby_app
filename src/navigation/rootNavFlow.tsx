import { useMutation, useQuery } from '@apollo/react-hooks';
import { NavigationContainer, NavigationContainerRef, useLinking } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import { CONFIRM_USER, LOGIN_USER, REGISTER_USER } from '../apollo/mutations/mutations';
import { ME_QUERY } from '../apollo/queries/queries';
import { LoginScreen } from '../views/auth/LoginScreen';
import { RegisterScreen } from '../views/auth/RegisterScreen';
import DashboardNavigation from '../views/dashboard/DashboardNavigation';
import { AuthContext, RootStackParamList, SignInData, SignUpData, SignUpResponse } from './authContext';

const RootStack = createStackNavigator<RootStackParamList>();

interface DeepLinkingState {
  routes: {
    name: string,
    params: {
      token: string
    }
  }[]
}

interface LinkEvent {
  url: string;
}

interface ConfirmUserData {
  token: string;
}

interface ConfirmUserResponse {
  confirmUser: boolean
}

interface MeResponse {
  me: {
    id: string;
  }
}

const Loading = () => <Text>Loading...</Text>

const Error = () => <Text>error</Text>

const App = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [registerUser] = useMutation<SignUpResponse,SignUpData>(REGISTER_USER)
  const [confirmUser] = useMutation<ConfirmUserResponse,ConfirmUserData>(CONFIRM_USER);
  const [initialState, setInitialState] = useState<DeepLinkingState | undefined>()
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)
  const {loading, data, error} = useQuery<MeResponse>(ME_QUERY);

  const ref = React.createRef<NavigationContainerRef>()

  const [isReady, setIsReady] = React.useState(false);
  const { getInitialState } =  useLinking(ref, {
    prefixes: ["https://hungry-kilby-128f75.netlify.com/"],
    config: {
      LoginScreen: 'login'
    }
  })

  const handleLink = async ({url}: LinkEvent) => {

      const [head, tail] = url.split("?")
      const {token} = qs.parse(tail) as {token: string}
      if(token) {
        const {data} = await confirmUser({variables: {token}})
        if(data?.confirmUser) {
          console.log("User potwierdzony")
        } else {
          console.log("user niepotwierdzony")
        }

      }
  }

  useEffect(() => {
    Linking.addEventListener('url', handleLink)
    return () => {
      Linking.removeEventListener('url', handleLink)
    }
  }, [])

  //handle the deep linking
  useEffect(() => {
    console.log("Yo bitch")
    Promise.race([
      getInitialState(),
      new Promise(resolve => setTimeout(resolve, 150))
    ]).then((state) => {
    
      if(state !== undefined) {
        setInitialState(state as DeepLinkingState)
      }
      setIsReady(true)
    }).catch(e => {
      console.error(e);
    })
  }, [isReady])


  const authContext = React.useMemo(
    () => ({
      signIn: async (data: SignInData) => {
          const {data: loginData} = await loginUser({variables: data});
          if(loginData.login.id){
            setIsUserSignedIn(true)
          }
      },
      signUp: async(data: SignUpData): Promise<SignUpResponse |undefined> => {
        const response = await registerUser({variables: data})
        return response?.data
      },
      signOut: () => setIsUserSignedIn(false)
    }),
    [isUserSignedIn],
  );
  
  console.log({isUserSignedIn})
  console.log(data?.me?.id)
  return (
    <NavigationContainer  initialState={initialState} ref={ref}>
      <AuthContext.Provider value={authContext}>
        <RootStack.Navigator headerMode="none">
          {loading && <RootStack.Screen name="LoadingScreen" component={Loading} />}
            {(data?.me?.id || isUserSignedIn) ? (<RootStack.Screen name="HomeScreen" component={DashboardNavigation} />) :
            <>
            <RootStack.Screen
              name="LoginScreen"  
              component={LoginScreen}
            />
          <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
  }
        </RootStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;
