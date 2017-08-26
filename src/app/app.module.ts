import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { GraphPage } from '../pages/graph/graph';
import {ModalPage} from '../pages/modal/modal';
import { UsersService } from '../providers/users-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {Facebook} from '@ionic-native/facebook';
import {GoogleAuth,User} from '@ionic/cloud-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import {SocialSharing} from '@ionic-native/social-sharing';
import * as firebase from 'firebase';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';


export const config = {
    apiKey: "AIzaSyA1crR9P5IZhqX13YoMjkJkunfMk-dLF8k",
    authDomain: "bunk-fbc96.firebaseapp.com",
    databaseURL: "https://bunk-fbc96.firebaseio.com",
    projectId: "bunk-fbc96",
    storageBucket: "bunk-fbc96.appspot.com",
    messagingSenderId: "689918983724"
  };
    

  firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    GraphPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RoundProgressModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    GraphPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    SocialSharing,
    AndroidFullScreen
  ]
})
export class AppModule {}
