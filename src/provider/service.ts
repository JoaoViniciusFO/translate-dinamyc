import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class Service {
    public _url: string;
    constructor(private _http: HttpClient){
        this._url = "DEFAULT_URI_REST";
    }

    getTranslates(language: string): Observable<any>{
        return this._http.get(`${this._url}pagina/${language}/linguagem`)
    }
}   