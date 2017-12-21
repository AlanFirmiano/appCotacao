import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcoesProvider } from "../../providers/acoes/acoes";
import {ContactPage} from "../contact/contact";
import {CotacoesProvider} from "../../providers/cotacoes/cotacoes";
import {on} from "@ionic/app-scripts/dist/util/events";
import {objectAssign} from "@ionic/app-scripts";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    AcoesProvider
  ]
})
export class HomePage {
  public list_acoes = new Array<any>();
  public idt:number;
  public name:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private acoesProvider:AcoesProvider
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
  navigate(objSelecionado){
    this.navCtrl.push(ContactPage, {
      idt: objSelecionado.idt,
      name:objSelecionado.name
    })
  }

}
