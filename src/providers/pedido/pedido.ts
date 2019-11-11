import { Injectable } from '@angular/core';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';
import { HttpResultModel } from '../../app/models/HttpResultModel';
import { ProviderBase } from '../../app/base/providerBase';
import { ProdutoModel } from '../../app/models/produtoModel';


@Injectable()
export class PedidoProvider extends ProviderBase<ProdutoModel> {

  url: string = `${ConfigHelper.Url}/pedido`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}/pedido`, http);
  }

  async pedidosGetAll(): Promise<HttpResultModel> {
    return this.http.get(`${this.url}`);
  }
}
