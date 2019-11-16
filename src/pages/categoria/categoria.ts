import { CategoriaProvider } from './../../providers/categoria/categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { AlertProvider } from '../../providers/alert/alert';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  categorias: Array<CategoriaModel> = new Array<CategoriaModel>();
  name;
  usuario: UsuarioModel = new UsuarioModel();
  idUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoriaSrv: CategoriaProvider,
    public actionSheetCtrl: ActionSheetController,
    public evt: Events,
    private alertCtrl: AlertProvider,
    private usuarioSrv: UsuarioProvider,
    private http: HttpProvider, ) {
    this.getUserName();
    this.getId();
    this.resetItens();
  }

  ionViewWillEnter() {
    this.load();


  }
  async load(): Promise<void> {
    try {
      let categoriasResult = await this.categoriaSrv.get();
      if (categoriasResult.success)
        this.categorias = <Array<CategoriaModel>>categoriasResult.data;
if(this.categorias.length == 0){this.navCtrl.push('AvisoOffPage')}
    } catch (error) {
      console.log('problema ao carregar as categorias', error);
    }
  }

  adminOptions(): void {
    let action = this.actionSheetCtrl.create({
      title: 'Administração',
      buttons: [
        { text: 'Gerenciar Categorias', handler: () => { this.gerenciarCategoria(); } },
        { text: 'Gerenciar Produtos', handler: () => { this.gerenciarProduto(); } },
        { text: 'Gerenciar Pedidos', handler: () => { this.gerenciarPedidos(); } },

        { text: 'Cancelar', handler: () => { }, role: 'destructive' }
      ]
    });
    action.present();
  }

  selecionarProduto(item: CategoriaModel): void {
    localStorage.setItem(ConfigHelper.storageKeys.selectCategory, JSON.stringify(item));
    this.navCtrl.setRoot('ProdutosPage');
  }
  private gerenciarPedidos() {
    this.navCtrl.push('PedidosPage')
  }

  private gerenciarCategoria(): void {
    this.navCtrl.push('AdmCategoriasPage');
  }

  private gerenciarProduto(): void {
    this.navCtrl.push('AdmProdutosPage');
  }
  private exit() {
    try {
      let exi = this.alertCtrl.confirm('Sair?', 'Deseja sair do seu Login?', async () => {
        if (exi == undefined) {
          await localStorage.removeItem(ConfigHelper.storageKeys.user)
          await localStorage.removeItem(ConfigHelper.storageName.userName)
          await localStorage.removeItem(ConfigHelper.storageName.id)


          this.navCtrl.setRoot('LoginPage')
        }
      })

    }
    catch (error) {
      console.log('erro ao sair', error)
    }
  }
  resetItens() {
    localStorage.removeItem(ConfigHelper.storageKeys.comentarioItem)
    localStorage.removeItem(ConfigHelper.storageKeys.comentsPay)
    localStorage.removeItem(ConfigHelper.storageKeys.payForm)
  }
  getUserName() {
    let result = localStorage.getItem(ConfigHelper.storageKeys.user);
    let user = result.substring(result.indexOf("nome") + 6)
    let final = user.split(',');
    this.name = final[0].replace(/[\\"]/g, '');
    if (this.name.includes('Jameson')) {
      this.name = 'Jameson';

    }
    localStorage.setItem(ConfigHelper.storageName.userName, this.name)
  }
  getId() {
    let resultData = localStorage.getItem(ConfigHelper.storageKeys.user);
    let resultId = resultData.substring(resultData.indexOf('id') + 4)
    let id = resultId.split(',')
    this.idUser = id[0].replace(/[\\"]/g, '');
    if (this.idUser) {
      console.log(this.idUser)
      localStorage.setItem(ConfigHelper.storageName.id, this.idUser)
    }
  }

}
