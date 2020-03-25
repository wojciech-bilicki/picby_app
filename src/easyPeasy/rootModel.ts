import IntroductionModel, {
  IntroStoreModel,
} from './introduction/model/introductionModel';
import ForgotPassModel, {
  ForgotPassStoreModel,
} from './auth/forgotPass/forgotPassModel';
import LoginModel, {LoginStoreModel} from './auth/login/loginModel';
import RegisterModel, {RegisterStoreModel} from './auth/register/registerModel';

export interface StoreModel {
  IntroductionModel: IntroStoreModel;
  ForgotPassModel: ForgotPassStoreModel;
  LoginModel: LoginStoreModel;
  RegisterModel: RegisterStoreModel;
}

const model = {
  IntroductionModel,
  ForgotPassModel,
  LoginModel,
  RegisterModel,
};

export default model;
