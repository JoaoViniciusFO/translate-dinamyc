import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class Service {
    public _url: string;
    constructor(private _http: HttpClient){
        this._url = "http://192.168.1.143:8080/public/traducao/";
    }

    getTranslates(language: string): Observable<any>{
        return this._http.get(`${this._url}pagina/${language}/linguagem`)
    }
}   