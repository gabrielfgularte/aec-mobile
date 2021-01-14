import BaseAPIService from './BaseAPIService';

export default class UserAPIService extends BaseAPIService {

  constructor({user = null}) {
    super(user)
    this.user = user;
  }

  static get endpoint() {
    return '/auth';
  }

  static login(credentials) {
    return UserAPIService.post('/auth/login/', credentials);
  }

}
