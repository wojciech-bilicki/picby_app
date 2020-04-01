import {Action, action, thunk, Thunk} from 'easy-peasy';

export interface CatalogsStoreModel {
  isAddNewCatalogModalVisible: boolean;
  toggleIsAddNewCatalogModalVisible: Action<CatalogsStoreModel, boolean>;
  resetActiveScreenNumberToDefault: Thunk<CatalogsStoreModel, number>;
}
const CatalogsModel: CatalogsStoreModel = {
  isAddNewCatalogModalVisible: false,
  toggleIsAddNewCatalogModalVisible: action((state, payload) => {
    state.isAddNewCatalogModalVisible = payload;
  }),
  resetActiveScreenNumberToDefault: thunk(actions => {
    actions.toggleIsAddNewCatalogModalVisible(false);
  }),
};

export default CatalogsModel;
