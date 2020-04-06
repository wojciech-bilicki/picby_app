import ForgotPassModel, { ForgotPassStoreModel } from './auth/forgotPass/forgotPassModel';
import LoginModel, { LoginStoreModel } from './auth/login/loginModel';
import ForgotFormModel, { ForgotFormStoreModel } from './auth/newPassForm/newPassModel';
import RegisterModel, { RegisterStoreModel } from './auth/register/registerModel';
import CatalogsModel, { CatalogsStoreModel } from './catalogs/catalogsModel';
import IntroductionModel, { IntroStoreModel } from './introduction/model/introductionModel';

export interface StoreModel {
  IntroductionModel: IntroStoreModel;
  ForgotPassModel: ForgotPassStoreModel;
  LoginModel: LoginStoreModel;
  RegisterModel: RegisterStoreModel;
  ForgotFormModel: ForgotFormStoreModel;
  CatalogsModel: CatalogsStoreModel;
}

const model = {
  IntroductionModel,
  ForgotPassModel,
  LoginModel,
  RegisterModel,
  ForgotFormModel,
  CatalogsModel,
};

export default model;
