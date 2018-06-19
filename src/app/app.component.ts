import { Service } from './../provider/service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import PouchDB from 'pouchdb';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
  providers:[Service]
})
export class MyApp {
  rootPage:any = HomePage;
  public db: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private service: Service) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.service.getTranslates("pt")
      .subscribe(
        res =>{
          res.forEach(element => {
            this.setTranslates(element);
          });
        },
        erro =>{
          console.log(erro)
        }
      );
    });
  }

  setTranslates(pag){
    this.resetDB();
    this.db = new PouchDB("translate");
    this.db.allDocs().then((res)=>{
      console.log(res)
    });
    this.db.post(pag).then(function (response) {
      console.log(response);
    }).catch(function (err) {
      console.log(err);
    });
  }

  resetDB(){
    this.db = new PouchDB("translate");
    this.db.destroy();
  }

}

