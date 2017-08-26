import { Component } from '@angular/core';
import {HomePage} from '../home/home';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFireAuth,AngularFireAuthProvider,AngularFireAuthModule} from 'angularfire2/auth';
import {FirebaseListObservable,AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
/**
 * Generated class for the GraphPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage {

  public dataList: FirebaseListObservable<any>; 
  public userId: string;
  public subjectId: string;
  public myPercent : number;
  public myColor: any;
  public percentDisplay : any;
  public canBunk: number;
  public toAttend: number;
  public bunked : number;
  public ref: any;
  public attended: number;
  public total: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private angFire: AngularFireDatabase,private fAuth:AngularFireAuth) {
  
    this.subjectId = this.navParams.get('id');

    this.fAuth.authState.subscribe(user=>{
   	  if(user){
             this.userId = user.uid;//fetching userID from firebase
            
             this.ref = firebase.database().ref('users/'+this.userId +'/subjects/' + this.subjectId+ '/data');

             
             this.ref.orderByChild('attended').on('value', snapshot =>{
               this.attended = snapshot.val().attended;
               console.log(this.attended);                        //fetching value for attended
             })
             this.ref.orderByChild('total').on('value', snapshot =>{
               this.total=snapshot.val().total;
               console.log(this.total);                                //fetching value for total
             })

             }
            this.bunked = this.total-this.attended;
            this.myPercent = (this.attended/this.total)*100;                 //calculating percent
            this.percentDisplay = this.myPercent.toFixed(2);  //rounding upto two decimal
            console.log(this.myPercent);
//color
            if(this.percentDisplay>=75){
              this.myColor ='#00ff90';
            }
            else if(this.percentDisplay<75 && this.percentDisplay>=60){
              this.myColor ='#45ccce';
            }
            else if(this.percentDisplay<60 && this.percentDisplay>=50){
             this.myColor ='#F87A14';
            }
            else if(this.percentDisplay<50){
              this.myColor = '#F50A0A';
            }
            //color

            if(this.myPercent<75){
             this.toAttend = Math.ceil(((this.total*0.75) - this.attended)/0.25);
            }
            else{
              this.toAttend = 0;
            }
            console.log(this.toAttend);


            if(this.myPercent>75){
             this.canBunk = Math.floor((this.attended - (this.total*0.75))/0.75);
             
            }
            else{
              this.canBunk = 0;
            }
            console.log(this.canBunk);
          
            this.fAuth.authState.subscribe(user=>{
       if(user){
             this.userId = user.uid;//fetching userID from firebase
            
             console.log(this.userId);
               this.dataList = this.angFire.list('/users/'+ this.userId +'/subjects/' + this.subjectId);  //setting directory
     }
   });
   });
          
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraphPage');
  }

  doSomethingWithCurrentValue($event){
  	
  }


attendedClicked(){

let alert = this.alertCtrl.create({
    title: 'Are you sure?',
    
    buttons: [
      {
        text: 'Nope',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yup',
        handler: () => {
          console.log(this.attended);
       
       this.ref.update({
               "attended" : this.attended + 1,
               "total" : this.total + 1

           
             })

          
 this.myPercent = (this.attended/this.total)*100;
 this.percentDisplay = this.myPercent.toFixed(2);  //rounding upto two decimal
 console.log(this.myPercent);
 //color
            if(this.percentDisplay>=75){
              this.myColor ='#00ff90';
            }
            else if(this.percentDisplay<75 && this.percentDisplay>=60){
              this.myColor ='#45ccce';
            }
            else if(this.percentDisplay<60 && this.percentDisplay>=50){
             this.myColor ='#F87A14';
            }
            else if(this.percentDisplay<50){
              this.myColor = '#F50A0A';
            }
            //color

        }
      }
    ]
  });
  alert.present();


   
}

bunkedClicked(){


  let alert = this.alertCtrl.create({
    title: 'Are you sure?',
    
    buttons: [
      {
        text: 'Nope',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yup',
        handler: () => {
          console.log(this.attended);
       
       this.ref.update({
               
               "total" : this.total + 1

           
             })

         
this.myPercent = (this.attended/this.total)*100;
this.percentDisplay = this.myPercent.toFixed(2);  //rounding upto two decimal
console.log(this.myPercent);
//color
            if(this.percentDisplay>=75){
              this.myColor ='#00ff90';
            }
            else if(this.percentDisplay<75 && this.percentDisplay>=60){
              this.myColor ='#45ccce';
            }
            else if(this.percentDisplay<60 && this.percentDisplay>=50){
             this.myColor ='#F87A14';
            }
            else if(this.percentDisplay<50){
              this.myColor = '#F50A0A';
            }
            //color
        }
      }
    ]
  });
  alert.present();
  
  
	
}

info(){     
            this.bunked = this.total-this.attended;
            if(this.myPercent<75){
             this.toAttend = Math.ceil(((this.total*0.75) - this.attended)/0.25);
            }
            else{
              this.toAttend = 0;
            }

            if(this.myPercent>75){
             this.canBunk = Math.floor((this.attended - (this.total*0.75))/0.75);
            }
            else{
              this.canBunk = 0;
            }

  let alert = this.alertCtrl.create({
    title: 'Info',
    message: 'Classes Attended: ' + this.attended + '<br/>'+ 'Classes Bunked: ' + this.bunked + '<br/><br/><b>To maintain 75% :</b><br/>' +'Classes you can BUNK: ' + this.canBunk + '<br/> Classes you have to attend: ' + this.toAttend ,
    
    buttons: [
      {
        text: 'ok',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      
    ]
  });
  alert.present();
 
}

}
