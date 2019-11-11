import { CarrinhoProvider } from './../../providers/carrinho/carrinho';
import { AlertProvider } from './../../providers/alert/alert';
import { ProdutoModel } from './../../app/models/produtoModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarrinhoModel } from '../../app/models/carrinhoModel';
import { ConfigHelper } from '../../app/helpers/configHelper';

@IonicPage()
@Component({
  selector: 'page-visualizar-produto',
  templateUrl: 'visualizar-produto.html',
})
export class VisualizarProdutoPage {

  produto: ProdutoModel = new ProdutoModel();
  carrinho: CarrinhoModel = new CarrinhoModel();
coments: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    private alertSrv: AlertProvider,
    private carrinhoSrv: CarrinhoProvider) {

  }

  ionViewDidLoad() {
    this.produto = <ProdutoModel>this.navParams.get('prod');
  }

  voltar() {
    this.ViewCtrl.dismiss();
  }

  adicionarNoCarrinho() {
    this.alertSrv.toast('Produto adicionado ao carrinho com sucesso!', 'bottom');
    this.carrinhoSrv.adicionarNovoItem(this.produto);

this.comentario();
    this.ViewCtrl.dismiss();
  }
  public comentario(){
    this.coments = this.produto.comentario;
  localStorage.setItem(ConfigHelper.storageKeys.comentarioItem, this.coments)

  }

}
