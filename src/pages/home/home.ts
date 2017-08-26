import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {LoginPage} from '../login/login';
import { ModalPage } from '../modal/modal';
import {GraphPage} from '../graph/graph';
import {NavController,AlertController,ModalController, ViewController} from 'ionic-angular';
import {UsersService} from '../../providers/users-service';
import {AngularFireAuth,AngularFireAuthProvider,AngularFireAuthModule} from 'angularfire2/auth';
import {FirebaseListObservable,AngularFireDatabase} from 'angularfire2/database';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersService]
})
export class HomePage {
	
  public fireAuth: any;
  public userProfile: any;
  public userId: string;
  public subjects: FirebaseListObservable<any>;	
  /*
   user: Observable<firebase.User>;
*/
  constructor(public viewCtrl: ViewController,public modalCtrl: ModalController,public navCtrl: NavController,private usersService: UsersService, public alertCtrl: AlertController, private angFire: AngularFireDatabase,private fAuth:AngularFireAuth,private androidFullScreen: AndroidFullScreen) {

   
   this.fireAuth = firebase.auth();
   this.userProfile = firebase.database().ref('users');

   this.fAuth.authState.subscribe(user=>{
   	if(user){
      this.userId = user.uid;
      console.log(this.userId);
      this.subjects = this.angFire.list('/users/'+ this.userId +'/subjects');  //setting add subject and loop directory
   	}
   });
   /*
   this.user = fAuth.authState;   
    

             if(this.user){
               this.userId = user.uid;
               console.log(this.userId);
               this.subjects = this.angFire.list('/users/'+ this.userId +'/subjects');  //setting add subject and loop directory

               */
              // this.dataRoot = this.angFire.database.list('/users/'+ this.userId +'/subjects');
             
      
             

            //this.subjects = this.angFire.database.list('/users/'+ this.userId +'/subjects');  //setting directory
             
     //      })
  }

signUserOut(){
  	this.usersService.signoutUser().then(()=>{
  		//window.location.reload();
      this.navCtrl.parent.parent.setRoot(LoginPage);
      firebase.auth().onAuthStateChanged((user) =>{
              localStorage.removeItem('user');

    })
     
  	})
  }
/**/

  addSubject():void{

      
    let prompt = this.alertCtrl.create({
      title: 'Add Subject',
      message: "Enter the name of the subject",
      inputs: [
        {
          name: 'name',
          placeholder: 'Subject Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            

            // authentication and getting user id

          this.fAuth.authState.subscribe(user=>{
   	  if(user){
        this.userId = user.uid;
        console.log(this.userId);
        this.subjects = this.angFire.list('/users/'+ this.userId +'/subjects');  //setting add subject and loop directory
   	}
   });

//end of fetching id



            this.subjects.push({
              name: data.name,
              data:{
                  name: data.name,
                  attended: 0,
                  percentage: 0,
                  total: 0

              }
                            
            });

            
          }
        }
      ]
    });
    prompt.present();
  }


editSubject(subject){


  let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: "Edit the subject name",
      inputs: [
        {
          name: 'name',
          placeholder: subject.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            
     let newName:string = subject.name;

     if(data.name != ''){
       newName = data.name;
     }

            this.subjects.update(subject.$key, {

              name: newName,
            
            })
            this.subjects.update(subject.$key+'/data',{

              name: newName,
            
            })
          }
        }
      ]
    });
    prompt.present();

}


deleteSubject(subjectID){

   let prompt = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            
             this.subjects.remove(subjectID);

          }
        }
      ]
    });
    prompt.present();

  
}
  
  redirectToGraph(subjectId){


 let data = {
      id :  subjectId,
 }

console.log(subjectId);
    //this.fetchSubjectId = subjectId;
    this.navCtrl.push(GraphPage,data);
  }

  ionViewDidLoad() {

    this.androidFullScreen.isSupported()
  .then(() => this.androidFullScreen.showUnderStatusBar())
  .catch((error: any) => console.log(error));
    
    

  }



}
