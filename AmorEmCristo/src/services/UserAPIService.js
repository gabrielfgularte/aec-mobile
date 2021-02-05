import BaseAPIService from './BaseAPIService';

export default class UserAPIService extends BaseAPIService {

  constructor({user = null}) {
    super(user)
    this.user = user;
  }

  static get endpoint() {
    return '/auth';
  }

  static login(payload) {
    return UserAPIService.post('/auth/login/', payload);
  }

	static signUp(payload) {
    return UserAPIService.post('/auth/signup/', payload);
  }

}
