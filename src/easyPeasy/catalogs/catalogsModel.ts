import {Action, action, thunk, Thunk} from 'easy-peasy';

interface userCatalog {
  id: string;
  name: string;
}
export interface CatalogsStoreModel {
  isAddNewCatalogModalVisible: boolean;
  isSettingsModalOpen: boolean;
  userCatalogs: [userCatalog] | [];
  toggleIsAddNewCatalogModalVisible: Action<CatalogsStoreModel, boolean>;
  resetActiveScreenNumberToDefault: Thunk<CatalogsStoreModel, number>;
  setUserCatalogs: Action<CatalogsStoreModel, [userCatalog] | []>;
  toggleIsSettingsModalOpen: Action<CatalogsStoreModel, boolean>;
}
const CatalogsModel: CatalogsStoreModel = {
  isAddNewCatalogModalVisible: false,
  isSettingsModalOpen: false,
  userCatalogs: [],
  toggleIsAddNewCatalogModalVisible: action((state, payload) => {
    state.isAddNewCatalogModalVisible = payload;
  }),
  toggleIsSettingsModalOpen: action((state, payload) => {
    state.isSettingsModalOpen = payload;
  }),
  resetActiveScreenNumberToDefault: thunk(actions => {
    actions.toggleIsAddNewCatalogModalVisible(false);
  }),
  setUserCatalogs: action((state, payload) => {
    state.userCatalogs = payload;
  }),
};

export default CatalogsModel;
