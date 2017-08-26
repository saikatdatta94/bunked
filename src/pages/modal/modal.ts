import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController,LoadingController ,AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { UsersService } from '../../providers/users-service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
   providers: [UsersService]
})
export class ModalPage {

	public emailField: any;
	public passwordField: any;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController,private usersService: UsersService,private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController) {
  }

   signUserUp(){


  	this.usersService.signUpUser(this.emailField,this.passwordField).then((authData) =>{
       //signup success redirect to homepage 
  		this.navCtrl.push(TabsPage);
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
    logUserIn(){

   
    this.usersService.logInUser(this.emailField,this.passwordField).then((authData) =>{

       //signup success redirect to homepage 
       
      this.navCtrl.push(TabsPage);
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

 dismiss() {
   let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
