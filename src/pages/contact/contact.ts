import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AcoesProvider} from "../../providers/acoes/acoes";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[
    AcoesProvider
  ]
})
export class ContactPage{
  public list_cotacoes = new Array<any>();
  public idt:number;
  public name:string;
  public qtd:number;

  constructor(
    public navCtrl : NavController,
    private navParams :NavParams,
    private acoesProvider: AcoesProvider
  ) {
    this.atualizar();
  }

  atualizar(){
    if(this.list_cotacoes!=null){
      this.qtd = this.list_cotacoes.length;
    }
  }


  ionViewDidEnter() {
    this.idt = this.navParams.get("idt");
    this.name = this.navParams.get("name");

    this.acoesProvider.getListCotacoes(this.idt).subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_cotacoes = objeto.data;
        console.log(this.list_cotacoes);
        this.atualizar();
      },
      err=>{
        console.log(err);
      }
    );
  }
}
