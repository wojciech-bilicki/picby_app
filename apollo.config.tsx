import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import {HttpLink} from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://192.168.8.102:8090/graphql',
  credentials: 'include',
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
});

export default client;
