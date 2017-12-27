import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AcoesProvider } from "../../providers/acoes/acoes";
import { ContactPage } from "../contact/contact";
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
  searchQuery: string = '';

  list = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private acoesProvider:AcoesProvider
  ){
    this.initializeItems();
  }

  initializeItems() {
      this.list = this.list_acoes;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.list_acoes = this.list_acoes.filter(
        (item) => {
        return (item.code.toLowerCase().indexOf(val.toLowerCase()) != -1);
      });
    }
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
      name:objSelecionado.name,
      date:objSelecionado.date
    });
  }

}
