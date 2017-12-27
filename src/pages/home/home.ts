import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
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
  public loader;
  public refresher;
  public isRefreshing:boolean = false;

  searchQuery: string = '';
  list = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private acoesProvider:AcoesProvider,
    public loadingCtrl: LoadingController
  ){
    //this.initializeItems();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.initializeItems();
  }
  abrirCarregandoHome() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Ações..."
    });
    this.loader.present();
  }

  fecharCarregandoHome(){
    this.loader.dismiss();
  }

  initializeItems() {
    this.abrirCarregandoHome();
    this.acoesProvider.getListAcoes().subscribe(
      res=>{
        const response = (res as any);
        const objeto = JSON.parse(response._body);
        this.list_acoes = objeto.data;

        this.fecharCarregandoHome();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      err=>{
        console.log(err);
        this.fecharCarregandoHome();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
  }

  public val = '';
  getItems(ev: any) {
    // Reset items back to all of the items
    if(this.val == '') {
      this.initializeItems();
    }
    // set val to the value of the searchbar
    this.val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (this.val && this.val.trim() != '') {
      this.list_acoes = this.list_acoes.filter(
        (item) => {
        return (item.code.toLowerCase().indexOf(this.val.toLowerCase()) != -1);
      });
    }
  }

  ionViewDidEnter() {
    this.initializeItems();
  }
  navigate(objSelecionado){
    this.navCtrl.push(ContactPage, {
      idt: objSelecionado.idt,
      name:objSelecionado.name,
      date:objSelecionado.date
    });
  }

}
