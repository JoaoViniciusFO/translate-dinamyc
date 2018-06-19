import { Service } from './../provider/service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import PouchDB from 'pouchdb';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
  providers: [Service]
})
export class MyApp {
  rootPage: any = HomePage;
  public db: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private service: Service) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.service.getTranslates("pt")
        .subscribe(
          res => {
            this.setTranslates(res);
            // res.forEach(element => {
            //   this.setTranslates(element);
            // });
          },
          erro => {
            console.log(erro)
          }
        );
    });
  }

  setTranslates(pag: Array<any>) {
    console.log("set translate: ", pag);
    // this.resetDB();
    this.db = new PouchDB("translate");
    pag.map(item => {
      item._id = item.id;
      delete (item.id);
      return item;
    }).map(item => {
      this.db.put(item, function (err, response) {
        if (err) { return console.log(err); } else {
          console.log(response);
        }
      });
    });
    // this.db.allDocs().then((res)=>{
    //   console.log("res: ", res)
    // });
    // this.db.post(pag).then(function (response) {
    //   console.log("response: ", response);
    // }).catch(function (err) {
    //   console.log(err);
    // });
  }

  resetDB() {
    this.db = new PouchDB("translate");
    this.db.destroy();
  }

}

