import {
  action,
  observable,
  computed,
  toJS
} from 'mobx';

const _email = {
  id: 0,
  email: "",
};

class EmailStore {
  @observable emails = [];
  @observable email = _email;

  @action.bound update = (k, v) => this[k] = v;
  @action.bound updateEmail = (k, v) => this[k] = v;
  @action.bound reset = () => {
    this.email = _email
  }
}

export default EmailStore;