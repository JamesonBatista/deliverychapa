import { Events } from 'ionic-angular';
import { ProdutoModel } from './../../app/models/produtoModel';
import { CarrinhoProvider } from './../../providers/carrinho/carrinho';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AcaoCarrinhoEnum } from '../../app/enums/AcaoCarrinhoEnum';
import { ConfigHelper } from '../../app/helpers/configHelper';

@Component({
  selector: 'quantidade',
  templateUrl: 'quantidade.html'
})
export class QuantidadeComponent implements OnInit {


  numero: number = 0;
  @Input('produto') produto: ProdutoModel;
  @Output() quantidadeAlterada = new EventEmitter();

  constructor(
    private carrinhoSrv: CarrinhoProvider,
    private evt: Events) {
  }

  private _registerEvent(): void {
    this.evt.subscribe(ConfigHelper.Events.atualizaoQuantidadeProduto, () => {
      this._atualizarQuantidade();
    });
  }

  private _atualizarQuantidade(): void {
    let quantidadeNoCarrinho = this.carrinhoSrv.getQuantidadeItem(this.produto);
    this.numero = quantidadeNoCarrinho;
  }

  ngOnInit(): void {
    this._atualizarQuantidade();
    this._registerEvent();
  }


  adicionar() {
    this.numero += 1;
    this.quantidadeAlterada.emit({
      quantidade: this.numero,
      acao: AcaoCarrinhoEnum.Adicionar
    });
  }

  remover() {
    let _valorFinal = this.numero -= 1;
    if (_valorFinal <= 0)
      this.numero = 0;
    this.quantidadeAlterada.emit({
      quantidade: this.numero,
      acao: AcaoCarrinhoEnum.Remover
    });
  }

}
