import {
  action,
  observable,
  computed,
  toJS
} from 'mobx';

const _applicant = {
  id: 0,
  email: "",
  name: "",
  frontEnd: false,
  backEnd: false,
  authorized: false,
  start: "",
  resume: "",
  fullStack: false,
};

class ApplicantStore {
  @observable applicants = [];
  @observable applicant = _applicant;

  @action.bound update = (k, v) => this[k] = v;
  @action.bound updateApplicant = (k, v) => this[k] = v;
  @action.bound reset = () => {
    this.applicant = _applicant
  }
}

export default ApplicantStore;