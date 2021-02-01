import Rest from './_rest.service';

//endpoint
const url = '/validacao/uniao';

export default class Uniao extends Rest {
  static get_uniao() {
    return super.get(url);
  }

  static post_uniao(body) {
    return super.post(url, body);
  }
}