import {Action, action, thunk, Thunk} from 'easy-peasy';

interface userCatalog {
  id: string;
  name: string;
}
export interface CatalogsStoreModel {
  isAddNewCatalogModalVisible: boolean;
  isSettingsModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  numberOfUserCatalogs: number;
  userCatalogs: userCatalog[] | [] | undefined;
  toggleIsAddNewCatalogModalVisible: Action<CatalogsStoreModel, boolean>;
  resetCatalogsScreenToDefault: Thunk<CatalogsStoreModel, number>;
  setUserCatalogs: Action<CatalogsStoreModel, userCatalog[] | [] | undefined>;
  toggleIsSettingsModalOpen: Action<CatalogsStoreModel, boolean>;
  newAlbumName: string;
  updateNameValue: string;
  setNewAlbumName: Action<CatalogsStoreModel, string>;
  settingsCatalogId: string | undefined;
  setSettingsCatalogId: Action<CatalogsStoreModel, string | undefined>;
  setIsDeleteModalOpen: Action<CatalogsStoreModel, boolean>;
  setUpdateNameValue: Action<CatalogsStoreModel, string>;
  setIsEditModalOpen: Action<CatalogsStoreModel, boolean>;
  setNumberOfUserCatalogs: Action<CatalogsStoreModel, number>;
}
const CatalogsModel: CatalogsStoreModel = {
  isAddNewCatalogModalVisible: false,
  isSettingsModalOpen: false,
  isEditModalOpen: false,
  userCatalogs: undefined,
  newAlbumName: '',
  updateNameValue: '',
  isDeleteModalOpen: false,
  settingsCatalogId: undefined,
  numberOfUserCatalogs: 0,
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
  setIsEditModalOpen: action((state, payload) => {
    state.isEditModalOpen = payload;
  }),
  setUpdateNameValue: action((state, payload) => {
    state.updateNameValue = payload;
  }),
  setNumberOfUserCatalogs: action((state, payload) => {
    state.numberOfUserCatalogs = payload;
  }),
};

export default CatalogsModel;
