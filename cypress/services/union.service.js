import Rest from './_rest.service';

//endpoint
const url = '/validacao/uniao';

export default class Union extends Rest {
  static get_union() {
    return super.get(url);
  }

  static post_union(body) {
    return super.post(url, body);
  }
}