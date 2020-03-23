import {gql} from 'apollo-boost';

export const ADD_CATALOG = gql`
  mutation addCatalog($name: String!) {
    addCatalog(newCatalogData: {name: $name}) {
      id
      name
    }
  }
`;

export const REMOVE_CATALOG = gql`
  mutation removeCatalog($id: String!) {
    removeCatalog(id: $id)
  }
`;

export const UPDATE_CATALAOG = gql`
  mutation updateCatalog($name: String, $id: String) {
    updateCatalog(data: {name: $name, id: $id}) {
      id
      name
    }
  }
`;

export const ADD_ENTRY = gql`
  mutation addEntry($catalogId: String, $description: String, $photo: Upload!) {
    addEntry(catalogId: $catalogId, description: $description, photo: $photo)
  }
`;

export const REMOVE_ENTRY = gql`
  mutation removeEntry($catalogId: String, $id: String) {
    removeEntry(catalogId: $catalogId, id: $id) {
      id
      desc
      imageUrl
    }
  }
`;

export const UPDATE_ENTRY = gql`
  mutation updateEntry(
    $id: String!
    $description: String!
    $currentCatalogId: String!
    $newCatalogId: String!
    $photo: Upload!
  ) {
    updateEntry(
      data: {
        id: $id
        description: $description
        currentCatalogId: $currentCatalogId
        newCatalogId: $newCatalogId
      }
      photo: $photo
    ) {
      id
      desc
      imageUrl
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!, $token: String!) {
    changePassword(data: {password: $password, token: $token}) {
      id
      email
      catalogs {
        id
        name
      }
    }
  }
`;

export const CONFIRM_USER = gql`
  mutation confirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const LOGIN_USER = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      email
      catalogs {
        id
        name
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($password: String!, $email: String!) {
    register(data: {password: $password, email: $email}) {
      id
      email
      catalogs {
        id
        name
      }
    }
  }
`;
