import { ConfigHelper } from './../../app/helpers/configHelper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { ProdutoProvider } from '../../providers/produto/produto';
import { ProdutoModel } from '../../app/models/produtoModel';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { CarrinhoModel } from '../../app/models/carrinhoModel';
import { AcaoCarrinhoEnum } from '../../app/enums/AcaoCarrinhoEnum';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  categoriaSelecionada: CategoriaModel = new CategoriaModel();
  produtos: Array<ProdutoModel> = new Array<ProdutoModel>();
  carrinho: CarrinhoModel = new CarrinhoModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private produtoSrv: ProdutoProvider,
    private carrinhoSrv: CarrinhoProvider,
    public ModalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.carrinhoSrv.getCarrinho().subscribe(data => {
      this.carrinho = data;
    });

    this.categoriaSelecionada = <CategoriaModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.selectCategory));
    this.load();
  }

  async load(): Promise<void> {
    try {
      let produtosResult = await this.produtoSrv.produtosByCategoriaId(this.categoriaSelecionada._id);
      if (produtosResult.success)
        this.produtos = <Array<ProdutoModel>>produtosResult.data;
    } catch (error) {
      console.log('problema ao carregar os produtos', error);
    }
  }

  quantidadeAlterada(produto: ProdutoModel, evt: any): void {
    if (evt.acao == AcaoCarrinhoEnum.Adicionar)
      this.carrinhoSrv.adicionarNovoItem(produto);
    else
      this.carrinhoSrv.removerItem(produto);
  }

  visualizarProduto(item: ProdutoModel) {
    let modal = this.ModalCtrl.create('VisualizarProdutoPage', { prod: item });
    modal.present();
  }

  visualizarCarrinho(): void {
    this.navCtrl.push('CarrinhoPage', {});
  }

}
