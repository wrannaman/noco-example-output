import {
  useStaticRendering
} from 'mobx-react';
import AuthStore from './AuthStore';
import SnackStore from './SnackStore';
import UserStore from './UserStore';
import ApiKeyStore from './ApiKeyStore';
import EmailStore from './EmailStore';
import ApplicantStore from './ApplicantStore';
import CompanyStore from './CompanyStore';

let store = null;
const isServer = !process.browser;

useStaticRendering(isServer);

export default (initialData) => {
  if (isServer) {
    return {
      auth: new AuthStore(isServer, initialData),
      snack: new SnackStore(isServer, initialData),
      user: new UserStore(isServer, initialData),
      apiKey: new ApiKeyStore(isServer, initialData),
      email: new EmailStore(isServer, initialData),
      applicant: new ApplicantStore(isServer, initialData),
      company: new CompanyStore(isServer, initialData),
    };
  }
  if (store === null) {
    store = {
      auth: new AuthStore(isServer, initialData),
      snack: new SnackStore(isServer, initialData),
      user: new UserStore(isServer, initialData),
      apiKey: new ApiKeyStore(isServer, initialData),
      email: new EmailStore(isServer, initialData),
      applicant: new ApplicantStore(isServer, initialData),
      company: new CompanyStore(isServer, initialData),
    };
  }
  return store;
};