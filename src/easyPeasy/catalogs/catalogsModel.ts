import {Action, action, thunk, Thunk} from 'easy-peasy';

interface userCatalog {
  id: string;
  name: string;
}
export interface CatalogsStoreModel {
  isAddNewCatalogModalVisible: boolean;
  userCatalogs: [userCatalog] | [];
  toggleIsAddNewCatalogModalVisible: Action<CatalogsStoreModel, boolean>;
  resetActiveScreenNumberToDefault: Thunk<CatalogsStoreModel, number>;
  setUserCatalogs: Action<CatalogsStoreModel, [userCatalog] | []>;
}
const CatalogsModel: CatalogsStoreModel = {
  isAddNewCatalogModalVisible: false,
  userCatalogs: [],
  toggleIsAddNewCatalogModalVisible: action((state, payload) => {
    state.isAddNewCatalogModalVisible = payload;
  }),
  resetActiveScreenNumberToDefault: thunk(actions => {
    actions.toggleIsAddNewCatalogModalVisible(false);
  }),
  setUserCatalogs: action((state, payload) => {
    state.userCatalogs = payload;
  }),
};

export default CatalogsModel;
