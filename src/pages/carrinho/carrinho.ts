import { AlertProvider } from './../../providers/alert/alert';
import { CarrinhoModel } from './../../app/models/carrinhoModel';
import { CarrinhoProvider } from './../../providers/carrinho/carrinho';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcaoCarrinhoEnum } from '../../app/enums/AcaoCarrinhoEnum';
import { ProdutoModel } from '../../app/models/produtoModel';
import { CarrinhoItemModel } from '../../app/models/CarrinhoItemModel';
import { ConfigHelper } from '../../app/helpers/configHelper';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  coment: any;
 payCash: any;
 isCheckedItens:any;
  addInformation;
  produtos: ProdutoModel = new ProdutoModel();
  totalProdutos: number = 0.00;
  carrinho: CarrinhoModel = new CarrinhoModel();
  private _carrinho: CarrinhoModel = new CarrinhoModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private carrinhoSrv: CarrinhoProvider,
    private alertSrv: AlertProvider,

) {
    this.payCash = [{ val: 'Débito', isChecked: false },
                    { val: 'Crédito', isChecked: false },
                    { val: 'Dinheiro', isChecked: false },]

    this._carrinho.itens = new Array<CarrinhoItemModel>();
  }

  ionViewDidLoad() {
    this.carrinhoSrv.getCarrinho().subscribe(data => {
      this.carrinho = data;
    });
  }

  quantidadeAlterada(produto: ProdutoModel, evt: any): void {
    if (evt.acao == AcaoCarrinhoEnum.Adicionar)
      this.carrinhoSrv.adicionarNovoItem(produto);
    else
      this.carrinhoSrv.removerItem(produto);
  }

  async finalizarPedido(): Promise<void> {
    try {
      this.getIsChecked();
      this.getComent();
      if(this.isCheckedItens == undefined || this.isCheckedItens == "[]" || this.isCheckedItens == ""){
        this.alertSrv.toast('Por favor informe o modo de pagamento', 'bottom')
      }else{

        let pedidoResult = await this.carrinhoSrv.SalvarPedido(this.carrinho);
        if (pedidoResult.success) {

          this.alertSrv.toast('Pedido realizado com sucesso, logo você estará matando sua fome :D', 'bottom');
          this.navCtrl.setRoot('MeusPedidosPage');
        }

      }

    } catch (error) {
      console.log('Problema ao enviar seu pedido', error);
    }
  }
  getIsChecked(){
this.isCheckedItens = this.payCash.filter(value=>{

  return value.isChecked;
})
localStorage.setItem(ConfigHelper.storageKeys.payForm, JSON.stringify(this.isCheckedItens))

  }
  getComent(){
    this.coment =this.produtos.payComents
    localStorage.setItem(ConfigHelper.storageKeys.comentsPay, JSON.stringify(this.coment))

  }

}
