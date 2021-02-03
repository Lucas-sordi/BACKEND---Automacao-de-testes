import Rest from './_rest.service';

const url = '/validacao/uniao';

export default class Union extends Rest {
  static get_Union() {
    return super.get(url);
  }
}