import { Pipe, PipeTransform } from '@angular/core';
import PouchDB from 'pouchdb';
import * as _ from "lodash";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Pipe({
    name: 'translate',
    pure: true
})
export class PipeTranslate implements PipeTransform {
    private text: string;

    constructor(){
        this.publish();
    }

    public traducao$: BehaviorSubject<String> = new BehaviorSubject("Ok");

    transform(obj): any{
        let arrPath = obj.split(".");
        let db = new PouchDB('translate');
        console.log("agorafunfa")
        return this.traducao$;
        
        // return db.allDocs({
        //     include_docs: true,
        //     attachments: true
        // }).then((doc) => {
        //     if(doc.rows.length){
        //         let docPage = doc.rows.filter(result =>{ return result.doc['nome'] === arrPath[0]});
        //         var pageT = docPage[0]
        //         var traducao = pageT ? pageT.doc["traducoes"].filter(result =>{ return result.campo === arrPath[1]}) : null
        //         this.text = traducao[0] ? traducao[0].traducao: ""
        //         return this.text;
        //     }
        //   }).catch(function (err) {
        //     console.log(err);
        //   });

    }

    public publish(): void {
        // this.traducao$.next(events);
        setInterval(()=>{
            this.traducao$.next(this.traducao$.getValue() + " 9");
        },2000)
    }
}
