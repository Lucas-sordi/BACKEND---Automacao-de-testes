import Rest from './_rest.service';

//endpoint
const url = '/cliente', fixo = '/fixo', val = '/validacao';

export default class Cliente extends Rest {
  static get_cliente() {
    return super.get(url);
  }

  static get_fixoCliente() {
    return super.get(fixo, url);
  }

  static get_val_cliente() {
    return super.get(val, url);
  }

  static post_val_clientes(body) {
    return super.post(val, url, 's', body);
  }
}