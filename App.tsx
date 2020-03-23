import React from 'react';
import IntroductionContextProvider from './src/views/intruduction/introductionContext';
import AppContainer from './src/navigation/rootNavFlow';
import AuthContextProvider from './src/views/auth/authContext';

const App = () => {
  return (
    <IntroductionContextProvider>
      <AuthContextProvider>
        <AppContainer />
      </AuthContextProvider>
    </IntroductionContextProvider>
  );
};

export default App;
