import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CotacoesProvider} from "../../providers/cotacoes/cotacoes";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[
    CotacoesProvider
  ]
})
export class ContactPage {
  public list_cotacoes = new Array<any>();
  constructor(
    public navCtrl : NavController,
    private navParams :NavParams,
    private cotProvider: CotacoesProvider
  ) {

  }

  ionViewDidLoad() {
    this.cotProvider.getListCotacoes().subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_cotacoes = objeto.data;

      },
      err=>{
        console.log(err);
      }
    );
  }
}
