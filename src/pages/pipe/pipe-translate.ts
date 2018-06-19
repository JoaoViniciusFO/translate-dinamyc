import { Pipe, PipeTransform } from '@angular/core';
import PouchDB from 'pouchdb';
import * as _ from "lodash";

@Pipe({
    name: 'translate',
    pure: true
})
export class PipeTranslate implements PipeTransform {
    private text: string;

    constructor(){
    }
    
    transform(obj): any{
        let arrPath = obj.split(".");
        let db = new PouchDB('translate');
        return db.allDocs({
            include_docs: true,
            attachments: true
        }).then((doc) => {
            if(doc.rows.length){
                let docPage = doc.rows.filter(result =>{ return result.doc['nome'] === arrPath[0]});
                var pageT = docPage[0]
                var traducao = pageT ? pageT.doc["traducoes"].filter(result =>{ return result.campo === arrPath[1]}) : null
                this.text = traducao[0] ? traducao[0].traducao: ""
                return this.text;
            }
          }).catch(function (err) {
            console.log(err);
          });

    }

    getTranslate(obj,cb){
        
    }
}