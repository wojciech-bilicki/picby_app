import IntroductionModel, {
  IntroStoreModel,
} from './introduction/model/introductionModel';
import ForgotPassModel, {
  ForgotPassStoreModel,
} from './auth/forgotPass/forgotPassModel';
import LoginModel, {LoginStoreModel} from './auth/login/loginModel';
import RegisterModel, {RegisterStoreModel} from './auth/register/registerModel';
import ForgotFormModel, {
  ForgotFormStoreModel,
} from './auth/newPassForm/newPassModel';

export interface StoreModel {
  IntroductionModel: IntroStoreModel;
  ForgotPassModel: ForgotPassStoreModel;
  LoginModel: LoginStoreModel;
  RegisterModel: RegisterStoreModel;
  ForgotFormModel: ForgotFormStoreModel;
}

const model = {
  IntroductionModel,
  ForgotPassModel,
  LoginModel,
  RegisterModel,
  ForgotFormModel,
};

export default model;
