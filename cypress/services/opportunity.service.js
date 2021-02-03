import Rest from './_rest.service';

const url = '/oportunidade', val = '/validacao';

export default class Opportunity extends Rest {
  static get_Meets_Opportunities() {
    return super.get(url);
  }

  static get_Frontend_Opportunities() {
    return super.get(`${val}${url}`);
  }
}