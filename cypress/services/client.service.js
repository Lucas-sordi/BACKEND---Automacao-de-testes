import Rest from './_rest.service';

const url = '/cliente', val = '/validacao';

export default class Client extends Rest {
  static get_Meets_Clients() {
    return super.get(url);
  }

  static get_Frontend_Clients() {
    return super.get(`${val}${url}`);
  }
}