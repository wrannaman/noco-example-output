import {
  action,
  observable,
  computed,
  toJS
} from 'mobx';

const _user = {
  email: "",
  role: "",
  photo: "",
  name: "",
};

class UserStore {
  @observable users = [];
  @observable user = _user;

  @action.bound update = (k, v) => this[k] = v;
  @action.bound updateUser = (k, v) => this[k] = v;
  @action.bound reset = () => {
    this.user = _user
  }
}

export default UserStore;