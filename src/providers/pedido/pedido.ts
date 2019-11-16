import { Injectable } from '@angular/core';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';
import { HttpResultModel } from '../../app/models/HttpResultModel';
import { ProviderBase } from '../../app/base/providerBase';
import { PedidosModel } from '../../app/models/pedidosModel';


@Injectable()
export class PedidoProvider extends ProviderBase<PedidosModel> {


  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}/pedido`, http);
  }


}
