import { Injectable } from '@angular/core';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';
import { ProviderBase } from '../../app/base/providerBase';
import { ProdutoModel } from '../../app/models/produtoModel';


@Injectable()
export class PedidoUserProvider extends ProviderBase<ProdutoModel> {


  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}pedidoUser`, http);
  }


}
