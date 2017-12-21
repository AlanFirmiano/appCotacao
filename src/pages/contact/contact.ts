import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CotacoesProvider} from "../../providers/cotacoes/cotacoes";
import {AcoesProvider} from "../../providers/acoes/acoes";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[
    CotacoesProvider
  ]
})
export class ContactPage{
  public list_cotacoes = new Array<any>();
  public idt:number;
  public name:string;
  constructor(
    public navCtrl : NavController,
    private navParams :NavParams,
    private acoesProvider: AcoesProvider
  ) {

  }

  ionViewDidLoad() {
    this.idt = this.navParams.get("idt");
    this.name = this.navParams.get("name");
    this.acoesProvider.getListCotacoes(this.idt).subscribe(
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
