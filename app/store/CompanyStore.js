import {
  action,
  observable,
  computed,
  toJS
} from 'mobx';

const _company = {
  id: 0,
  name: "",
  email: "",
  frontEnd: false,
  backEnd: false,
  personName: "",
  howManyHire: 0,
  fullStack: false,
};

class CompanyStore {
  @observable companys = [];
  @observable company = _company;

  @action.bound update = (k, v) => this[k] = v;
  @action.bound updateCompany = (k, v) => this[k] = v;
  @action.bound reset = () => {
    this.company = _company
  }
}

export default CompanyStore;