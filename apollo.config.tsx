import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import env from './env';


console.log(env)
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: env.DEV_API,
  credentials: 'include',
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
});

export default client;
