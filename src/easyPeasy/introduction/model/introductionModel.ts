import {Action, action, thunk, Thunk} from 'easy-peasy';

export interface IntroStoreModel {
  activeScreenNumber: number;
  changeActiveScreenNumber: Action<IntroStoreModel, number>;
  resetActiveScreenNumberToDefault: Thunk<IntroStoreModel, number>;
}
const IntroductionModel: IntroStoreModel = {
  activeScreenNumber: 1,
  changeActiveScreenNumber: action((state, payload) => {
    state.activeScreenNumber = payload;
  }),
  resetActiveScreenNumberToDefault: thunk(actions => {
    actions.changeActiveScreenNumber(1);
  }),
};

export default IntroductionModel;
