import {createTypedHooks} from 'easy-peasy'; // 👈import the helper
import {StoreModel} from './model'; // 👈 import our model type

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
