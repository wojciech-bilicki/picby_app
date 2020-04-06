import {Action, action, thunk, Thunk} from 'easy-peasy';

interface userCatalog {
  id: string;
  name: string;
}
export interface CatalogsStoreModel {
  isAddNewCatalogModalVisible: boolean;
  isSettingsModalOpen: boolean;
  isDeleteModalOpen: boolean;
  userCatalogs: userCatalog[] | [];
  toggleIsAddNewCatalogModalVisible: Action<CatalogsStoreModel, boolean>;
  resetCatalogsScreenToDefault: Thunk<CatalogsStoreModel, number>;
  setUserCatalogs: Action<CatalogsStoreModel, userCatalog[] | []>;
  toggleIsSettingsModalOpen: Action<CatalogsStoreModel, boolean>;
  newAlbumName: string;
  setNewAlbumName: Action<CatalogsStoreModel, string>;
  settingsCatalogId: string | undefined;
  setSettingsCatalogId: Action<CatalogsStoreModel, string | undefined>;
  setIsDeleteModalOpen: Action<CatalogsStoreModel, boolean>;
}
const CatalogsModel: CatalogsStoreModel = {
  isAddNewCatalogModalVisible: false,
  isSettingsModalOpen: false,
  userCatalogs: [],
  newAlbumName: '',
  isDeleteModalOpen: false,
  settingsCatalogId: undefined,
  toggleIsAddNewCatalogModalVisible: action((state, payload) => {
    state.isAddNewCatalogModalVisible = payload;
  }),
  toggleIsSettingsModalOpen: action((state, payload) => {
    state.isSettingsModalOpen = payload;
  }),
  resetCatalogsScreenToDefault: thunk(actions => {
    actions.toggleIsAddNewCatalogModalVisible(false);
  }),
  setUserCatalogs: action((state, payload) => {
    state.userCatalogs = payload;
  }),
  setNewAlbumName: action((state, payload) => {
    state.newAlbumName = payload;
  }),
  setSettingsCatalogId: action((state, payload) => {
    state.settingsCatalogId = payload;
  }),
  setIsDeleteModalOpen: action((state, payload) => {
    state.isDeleteModalOpen = payload;
  }),
};

export default CatalogsModel;
