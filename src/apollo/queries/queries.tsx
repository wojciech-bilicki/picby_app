import {gql} from 'apollo-boost';

export const HELLO_QUERY = gql`
  query hello {
    hello
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      catalogs {
        id
      }
    }
  }
`;

export const ENTRIES_QUERY = gql`
  query getEntries {
    id
    desc
    imageUrl
  }
`;

export const CATALOG_QUERY = gql`
  query catalog($id: String!) {
    catalog(id: $id) {
      id
      name
    }
  }
`;

export const CATALOGS_QUERY = gql`
  query catalogs {
    id
    name
  }
`;
