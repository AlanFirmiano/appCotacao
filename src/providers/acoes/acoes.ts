import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";

/*
  Generated class for the AcoesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AcoesProvider {
  basepath = "/uolapi";
  constructor(
    public http: Http,
    private platform:Platform
  )
  {
    if(this.platform.is("cordova")){
      this.basepath = "http://cotacoes.economia.uol.com.br";
    }
  }

  getListAcoes(){
    return this.http.get(this.basepath+"/ws/asset/stock/list");
  }

  getListCotacoes(idt:number){
    return this.http.get(this.basepath+"/ws/asset/"+idt+"/intraday?");
  }
}
