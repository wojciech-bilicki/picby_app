import {Action, action} from 'easy-peasy';

export interface IntroStoreModel {
  activeScreenNumber: number;
  changeActiveScreenNumber: Action<IntroStoreModel, number>;
}
const IntroductionModel: IntroStoreModel = {
  activeScreenNumber: 1,
  changeActiveScreenNumber: action((state, payload) => {
    state.activeScreenNumber = payload;
  }),
};

export default IntroductionModel;
