import Rest from './_rest.service';

const url = '/cliente', fixo = '/fixo', val = '/validacao';

export default class Client extends Rest {
  static get_Valid_Emails() {
    return super.get(`${fixo}${url}`);
  }

  static get_Meets_Clients() {
    return super.get(url);
  }

  static get_Frontend_Clients() {
    return super.get(`${val}${url}`);
  }
}