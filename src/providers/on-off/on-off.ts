import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { ProdutoModel } from '../../app/models/produtoModel';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';


@Injectable()
export class OnOffProvider extends ProviderBase<ProdutoModel> {

  url: string = `${ConfigHelper.Url}ligardesligar`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}ligardesligar`, http)
  }

}
