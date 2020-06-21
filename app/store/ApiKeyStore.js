import {
  action,
  observable,
  computed,
  toJS
} from 'mobx';

const _apiKey = {
  key: "",
};

class ApiKeyStore {
  @observable apiKeys = [];
  @observable apiKey = _apiKey;

  @action.bound update = (k, v) => this[k] = v;
  @action.bound updateApiKey = (k, v) => this[k] = v;
  @action.bound reset = () => {
    this.apiKey = _apiKey
  }
}

export default ApiKeyStore;