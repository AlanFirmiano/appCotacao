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
  public data:string;
  dateReviver(value:any) {
    var a;
    if (typeof value === 'string') {
      a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
      if (a) {
        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
          +a[5], +a[6]));
      }
    }
    return value;
  };
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
