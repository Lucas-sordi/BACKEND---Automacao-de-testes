import Rest from './_rest.service';

const url = '/validacao/uniao';

export default class Union extends Rest {
  static post_Meets_Union(body) {
    return super.post(url, body);
  }
}