import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcoesProvider } from "../../providers/acoes/acoes";
import {ContactPage} from "../contact/contact";
import {CotacoesProvider} from "../../providers/cotacoes/cotacoes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    AcoesProvider
  ]
})
export class HomePage {
  public list_acoes = new Array<any>();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private acoesProvider:AcoesProvider,
    private cotacoesProvider:CotacoesProvider
  ){

  }
  ionViewDidLoad() {
    this.acoesProvider.getListAcoes().subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_acoes = objeto.data;
      },
      err=>{
        console.log(err);
      }
    );
  }

  goToContactPage(){
      this.cotacoesProvider.getListCotacoes();
      this.navCtrl.push(ContactPage);
  }

}
