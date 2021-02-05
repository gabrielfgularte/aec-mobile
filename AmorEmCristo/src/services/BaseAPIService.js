import { env } from '../config';

export default class BaseAPIService {

  constructor(user) {
    this.user = user;
    this.controller = new AbortController();
  }

  static get api_url() {
    return env.api_url;
  }

  static get headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  static post(endpoint, payload) {

    const url = BaseAPIService.api_url + endpoint;

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: BaseAPIService.headers
      })
      .then((response) => response.json())
      .then((json) => {
        if ('error' in json) throw json.error;
				else if ('form_errors' in json) throw json.form_errors;
        return json;
      })
      .catch((error) => {
				console.log('error', error);
        throw error;
      });
  }

  get(endpoint) {
    const url = BaseAPIService.api_url + endpoint;
    const headers = {
      ...BaseAPIService.headers,
      'Authorization': 'Token ' + this.user.token
    }

    return fetch(url, {
      method: 'GET',
      headers: headers,
      signal: this.controller.signal
    })
    .then((response) => response.json())
    .then((json) => {
      if ('error' in json) throw json.error;
      return json;
    })
    .catch((error) => {
      throw error;
    });

  }
}
