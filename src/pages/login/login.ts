import { Component , ViewChild , Renderer , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController , AlertController, ToastController, Platform,ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ModalPage } from '../modal/modal';
import { UsersService } from '../../providers/users-service';
import {AngularFireAuth} from 'angularfire2/auth';
import { StatusBar } from '@ionic-native/status-bar';
import {Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsersService]
})
export class LoginPage {

  @ViewChild('myImage',{read: ElementRef}) myImage;

	public emailField: any;
	public passwordField: any;

  constructor(public modalCtrl: ModalController,private statusBar: StatusBar,public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private usersService: UsersService,private afAuth: AngularFireAuth, public toastCtrl: ToastController,private fb: Facebook, public platform: Platform,public googlePlus: GooglePlus,public renderer: Renderer,private androidFullScreen: AndroidFullScreen) {


    

  }


  signUserUp(){


  	this.usersService.signUpUser(this.emailField,this.passwordField).then((authData) =>{




       //signup success redirect to homepage 
  		this.navCtrl.setRoot(HomePage);
  	}, error =>{



  		 let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();

  	});

  	//loader icon when loading

  	
  	let loader = this.loadingCtrl.create({
  		content: "Signing you up",
  		dismissOnPageChange: false,
  	});
  	loader.present();
    loader.dismiss().then(()=>{
      console.log('Loader');  
    })
  	
  }




 googleSignIn(){

     this.googlePlus.login({
       'webClientId': '689918983724-5cf4nrsdr8bn9hj5gmd5g7ee2en10952.apps.googleusercontent.com',
       'offline': true
     }).then(res=>{
       firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(success=>{
         alert("Logged in Successfully")
       }).catch(error=>{
         alert("Error Signing in")
       })
     })

       //loader icon when loading

    
    let loader = this.loadingCtrl.create({
      content: "Logging you in",
      dismissOnPageChange: false,
    });
    loader.present();
    loader.dismiss().then(()=>{
      console.log('Loader');  
    })

  }


  signInWithFacebook() {
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
    }

  }
  
//write user in the system
  
  logUserIn(){

   
    this.usersService.logInUser(this.emailField,this.passwordField).then((authData) =>{

       //signup success redirect to homepage 
      this.navCtrl.setRoot(HomePage);
    }, error =>{


       let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();

    });

    //loader icon when loading

    
    let loader = this.loadingCtrl.create({
      content: "Logging you in",
      dismissOnPageChange: false,
    });
    loader.present();
    loader.dismiss().then(()=>{
      console.log('Loader');  
    })
    


  }

    signEmail() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }




  ionViewDidLoad() {
    this.statusBar.backgroundColorByHexString('#32db64');
    this.androidFullScreen.isSupported()
  .then(() => this.androidFullScreen.showUnderStatusBar())
  .catch((error: any) => console.log(error));
    var that=this;
    console.log('ionViewDidLoad LoginPage');
    setTimeout(function(){that.renderer.setElementStyle(that.myImage.nativeElement,'top','23%');},100);
    
    

  }

}

