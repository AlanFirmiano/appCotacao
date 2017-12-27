import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AcoesProvider } from "../../providers/acoes/acoes";

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
  public date:Date = new Date;

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
  getDateTimeFromTimestamp(unixTimeStamp) {
    var date = new Date(unixTimeStamp);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  }




  ionViewDidEnter() {
    this.idt = this.navParams.get("idt");
    this.name = this.navParams.get("name");

    this.acoesProvider.getListCotacoes(this.idt).subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_cotacoes = objeto.data;
        this.atualizar();
      },
      err=>{
        console.log(err);
      }
    );


  }
}
