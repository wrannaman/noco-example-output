
import { action, observable, computed, toJS } from 'mobx';
import { tokenCheck } from '../src/apiCalls/user';
import { maybeSetToken } from '../src/apiCalls/api';

const _userObject = {
  email: '',
  firstName: '',
  lastName: '',
  name: '',
  team: '',
  photo: '',
  permissions: { permissions: {}, groups: [] },
};

class AuthStore {

  @observable user = _userObject

  @action.bound update = (k, v) => {
    this.user[k] = v;
  }

  @action.bound  resetUser = () => this.user = _userObject;

  @action.bound async checkTokenAndSetUser({ token }) {
    try {
      const res = await tokenCheck(token);
      if (res && res.user) {
        const { name, email, photo, first_name, last_name, id, teams, role, walkthroughs, phone } = res.user;
        this.user.email = email;
        this.user.name = name;
        this.user.first_name = first_name;
        this.user.last_name = last_name;
        this.user.id = id;
        this.user.walkthoughs = walkthroughs;
        this.user.teams = teams;
        this.user.role = role;
        this.user.phone = phone;
        this.user.photo = photo;
        this.userPermissions = res.user.permissions;
        localStorage.setItem('@NOCO-user', JSON.stringify(res.user));
        maybeSetToken(token);
      }
      return this.user;
    } catch (e) {
      return null;
    }
  }
}

export default AuthStore;
