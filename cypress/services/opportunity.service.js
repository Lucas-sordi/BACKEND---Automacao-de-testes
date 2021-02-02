import Rest from './_rest.service';

//endpoint
const url = '/oportunidade', val = '/validacao';

export default class Opportunity extends Rest {
  static get_opportunity() {
    return super.get(url);
  }

  static get_val_opportunity() {
    return super.get(val, url);
  }

  static post_val_opportunities(body) {
    return super.post(val, url, 's', body);
  }
}