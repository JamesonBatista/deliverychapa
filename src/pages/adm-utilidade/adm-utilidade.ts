import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { ProdutoModel } from '../../app/models/produtoModel';
import { AlertProvider } from '../../providers/alert/alert';
import { OnOffProvider } from '../../providers/on-off/on-off';
import { CameraProvider } from '../../providers/camera/camera';
import { ConfigHelper } from '../../app/helpers/configHelper';


@IonicPage()
@Component({
  selector: 'page-adm-utilidade',
  templateUrl: 'adm-utilidade.html',
})
export class AdmUtilidadePage {

  util: ProdutoModel = new ProdutoModel();
  taxa;
  dataTaxa;
  comentIntro;
  online: string;
  sucessData;
  idChange;
  taxComent;
  msgonOff;
  usuariologado: ProdutoModel = new ProdutoModel();
  foto;
  _id;
  fotoIcon;
  nomeIcon;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utilSrv: UtilProvider,
    private alertSrv: AlertProvider,
    private onoff: OnOffProvider,
    private alertCtrl: AlertProvider,
    public actionSheetCtrl: ActionSheetController,
    private cameraSrv: CameraProvider,
    public platform: Platform,
  ) {

  }

  ionViewDidLoad() {
    this.getUtil();
    this.getOnline();
  }
  ligarOnline() {
    this.online = "ONLINE";
    try {
      this.alertCtrl.confirm(
        'Confirmação', `Deixa eu APP online? `, async () => {
          this.onOffLigar();
        })
    } catch (error) { console.log('erro ao tentar enviar o pedido', error) }
  }
  ligarOffline() {
    this.online = "DESLIGAR";
    try {
      this.alertCtrl.confirm(
        'Confirmação', `Deixa eu APP Offline? `, async () => {
          this.onOffLigar();
        })
    } catch (error) { console.log('erro ao tentar enviar o pedido', error) }
  }
  async getUtil() {
    let get = await this.utilSrv.get();
    if (get.success) {
      this.usuariologado = <ProdutoModel>get.data;
      this.util = <ProdutoModel>get.data;
      for (let index = 0; index < get.data.length; index++) {
        const element = get.data[index];

        this.taxComent = element

      }
      this.taxa = this.taxComent.taxaEntrega;
      this.comentIntro = this.taxComent.comentIntro;
      this.msgonOff = this.taxComent.msgonOff;
      for (let index = 0; index < get.data.length; index++) {
        const data = get.data[index];
        this.dataTaxa = data;
        this.foto = data.foto;
        this.fotoIcon = data.fotoIcon;
        this.nomeIcon = data.nomeIcon
        this._id = data._id
      }
    }
  }
  async taxaUpdate() {

    let _taxaEntrega: any = {}
    _taxaEntrega.taxaEntrega = this.taxa;
    _taxaEntrega.comentIntro = this.comentIntro;
    _taxaEntrega.msgonOff = this.msgonOff;
    _taxaEntrega.foto = this.foto;
    _taxaEntrega.fotoIcon = this.fotoIcon;
    _taxaEntrega.nomeIcon = this.nomeIcon;

    if (!this._id) {
      let update = await this.utilSrv.post(_taxaEntrega)
      if (update.success) {
        this.alertSrv.toast('Seus Dados foram atualizados.', 'bottom')
      }
    } else {
      let update = await this.utilSrv.put(this.taxComent._id, _taxaEntrega)
      if (update.success) {
        this.alertSrv.toast('Seus Dados foram atualizados.', 'bottom')
      }
    }
  }
  async excluirTaxa(_id: string): Promise<void> {
    try {
      let trash = await this.utilSrv.delete(_id);
      if (trash.success) {
        this.alertSrv.toast('Taxa Excluída, nova taxa será adicionada', 'bottom')
        this.taxaUpdate();
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }
  async getOnline() {
    let result = await this.onoff.get();
    if (result.success) {
      this.sucessData = <Array<ProdutoModel>>result.data;
      for (let index = 0; index < this.sucessData.length; index++) {
        const resp = this.sucessData[index];
        this.idChange = resp;
      }
    }
  }
  async onOffLigar() {
    let _ligardesligar: any = {}
    _ligardesligar.ligardesligar = this.online;
    if (!this.idChange._id) {
      let postonoff = await this.onoff.post(_ligardesligar)
      this.alertSrv.toast('Seu App está ONLINE/OFFLINE', 'bottom')

    } else {
      let onlineSrv = await this.onoff.put(this.idChange._id, _ligardesligar);
      if (onlineSrv.success) {
        this.alertSrv.toast('Seu App está ONLINE/OFFLINE', 'bottom')
      }

    }

  }
  getPictureOption(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Adicionar foto',
      buttons: [
        {
          text: 'Tirar Foto', handler: () => {
            this.cameraSrv.takePicture(photo => {
              this.foto = photo;
            });
          },
          icon: this.platform.is('ios') ? null : 'camera'
        },
        {
          text: 'Pegar galeria',
          handler: (() => {
            this.cameraSrv.getPictureFromGalery(photo => {
              this.foto = photo;
            });
          }),
          icon: this.platform.is('ios') ? null : 'images'
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          icon: this.platform.is('ios') ? null : 'close',
          handler: () => {
            //Cancela a ação
          }
        }
      ]
    });
    actionSheet.present();
  }
  getPictureOptionIcon(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Adicionar foto',
      buttons: [
        {
          text: 'Tirar Foto', handler: () => {
            this.cameraSrv.takePicture(photo => {
              this.fotoIcon = photo;
            });
          },
          icon: this.platform.is('ios') ? null : 'camera'
        },
        {
          text: 'Pegar galeria',
          handler: (() => {
            this.cameraSrv.getPictureFromGalery(photo => {
              this.fotoIcon = photo;
            });
          }),
          icon: this.platform.is('ios') ? null : 'images'
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          icon: this.platform.is('ios') ? null : 'close',
          handler: () => {
            //Cancela a ação
          }
        }
      ]
    });
    actionSheet.present();
  }

}
