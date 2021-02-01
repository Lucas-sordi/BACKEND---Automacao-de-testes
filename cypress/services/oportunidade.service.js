import Rest from './_rest.service';

//endpoint
const url = '/oportunidade', val = '/validacao';

export default class Oportunidade extends Rest {
  static get_oportunidade() {
    return super.get(url);
  }

  static get_val_oportunidade() {
    return super.get(val, url);
  }

  static post_val_oportunidades(body) {
    return super.post(val, url, 's', body);
  }
}