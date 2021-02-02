import Rest from './_rest.service';

//endpoint
const url = '/cliente', fixo = '/fixo', val = '/validacao';

export default class Client extends Rest {
  static get_client() {
    return super.get(url);
  }

  static get_fixed_client() {
    return super.get(fixo, url);
  }

  static get_val_client() {
    return super.get(val, url);
  }

  static post_val_clients(body) {
    return super.post(val, url, 's', body);
  }
}