import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AcoesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AcoesProvider {
  private url = "http://cotacoes.economia.uol.com.br/ws/asset/";
  constructor(public http: Http) {
    console.log('Hello AcoesProvider Provider');
  }

  getListAcoes(){
    return this.http.get(this.url+"stock/list");
  }
}
