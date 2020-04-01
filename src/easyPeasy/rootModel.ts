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
import CatalogsModel, {CatalogsStoreModel} from './catalogs/catalogsModel';

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
