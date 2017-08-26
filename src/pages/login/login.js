var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersService } from '../../providers/users-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { FacebookAuth, User } from '@ionic/cloud-angular';
//import {GoogleAuth,User} from '@ionic/cloud-angular';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(alertCtrl, loadingCtrl, navCtrl, navParams, usersService, afAuth, toastCtrl, fb, platform, /*public googleAuth: GoogleAuth, public user: User,*/ googlePlus, facebookAuth, user) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usersService = usersService;
        this.afAuth = afAuth;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.platform = platform;
        this.googlePlus = googlePlus;
        this.facebookAuth = facebookAuth;
        this.user = user;
    }
    LoginPage.prototype.signUserUp = function () {
        var _this = this;
        this.usersService.signUpUser(this.emailField, this.passwordField).then(function (authData) {
            //signup success redirect to homepage 
            _this.navCtrl.setRoot(HomePage);
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: error.message,
                buttons: ['OK']
            });
            alert.present();
        });
        //loader icon when loading
        var loader = this.loadingCtrl.create({
            content: "Signing you up",
            dismissOnPageChange: false,
        });
        loader.present();
        loader.dismiss().then(function () {
            console.log('Loader');
        });
    };
    LoginPage.prototype.googleSignIn = function () {
        if (this.platform.is('cordova')) {
            return this.googlePlus.login({})
                .then(function (res) { return console.log(res); })
                .catch(function (err) { return console.error(err); });
        }
    };
    LoginPage.prototype.signInWithFacebook = function () {
        this.facebookAuth.login().then(function (authdata) {
        });
        /*
            if (this.platform.is('cordova')) {
              return this.fb.login(['email', 'public_profile']).then(res => {
                const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                return firebase.auth().signInWithCredential(facebookCredential);
              })
            }
            else {
              return this.afAuth.auth
                .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                .then(res => console.log(res));
            }*/
    };
    //write user in the system
    LoginPage.prototype.logUserIn = function () {
        var _this = this;
        this.usersService.logInUser(this.emailField, this.passwordField).then(function (authData) {
            //signup success redirect to homepage 
            _this.navCtrl.setRoot(HomePage);
        }, function (error) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: error.message,
                buttons: ['OK']
            });
            alert.present();
        });
        //loader icon when loading
        var loader = this.loadingCtrl.create({
            content: "Logging you in",
            dismissOnPageChange: false,
        });
        loader.present();
        loader.dismiss().then(function () {
            console.log('Loader');
        });
    };
    /**/
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [UsersService]
    }),
    __metadata("design:paramtypes", [AlertController, LoadingController, NavController, NavParams, UsersService, AngularFireAuth, ToastController, Facebook, Platform, GooglePlus, FacebookAuth, User])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map