import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UsersService} from '../providers/users-service';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ModalPage } from '../pages/modal/modal';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 public rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private androidFullScreen: AndroidFullScreen) {
   
    firebase.auth().onAuthStateChanged((user) =>{

      if(user){
        this.rootPage = TabsPage;
      }
      else{
        this.rootPage = LoginPage;
      }

    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#32db64');
      splashScreen.hide();
      androidFullScreen.isSupported().then(() => this.androidFullScreen.showUnderStatusBar()).catch((error: any) => console.log(error));
    
    

    });
  }
}
