import ApolloClient from 'apollo-client';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {getUserTokenFromAsyncStorage} from './src/easyPeasy/auth/login/utils';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://192.168.161.241:8090/graphql',
  credentials: 'include',
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
});

export default client;
