import React from 'react';
import AppContainer from './src/navigation/rootNavFlow';

import client from './apollo.config';
import {ApolloProvider} from '@apollo/react-hooks';
import {StoreProvider, createStore} from 'easy-peasy';
import model from './src/easyPeasy/model';

const prefix = 'https://hungry-kilby-128f75.netlify.com/';
const store = createStore(model);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <AppContainer uriPrefix={prefix} />
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
