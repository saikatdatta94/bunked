import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UsersService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {
  public fireAuth: any;
	public userProfile: any;

  constructor(public http: Http) {
    
   this.fireAuth = firebase.auth();
   this.userProfile = firebase.database().ref('users');


  }

// for signing up user

  signUpUser(email: string, password: string){

  	return this.fireAuth.createUserWithEmailAndPassword(email,password).then((newUser) =>{

  		this.fireAuth.signInWithEmailAndPassword(email,password).then((authenticatedUser)=>{
  			this.userProfile.child(authenticatedUser.uid + '/subjects/subject1').set({
  				name: 'Subject'
         
  			});


        this.userProfile.child(authenticatedUser.uid + '/subjects/subject1/data').set({
          name: 'Subject1',
          attended : 0,
          total : 0,
          percentage : 100
        });
/*        */
  		});
  	});

  }

// for signing out user

  signoutUser(){
 
  
  	return this.fireAuth.signOut();


  }
/**/
//for user log in

logInUser(email: string, password: string){
  
  return this.fireAuth.signInWithEmailAndPassword(email,password);
}

/*
googleSignInUser(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');


  var that=this;


  return firebase.auth().signInWithPopup(provider).then((result) =>{*/
  /*
  if(result.user){
    this.userProfile.child(user.uid + '/subjects/subject1').set({
          name: 'Subject'
         
        });
    this.userProfile.child(user.uid + '/subjects/subject1/data').set({
          name: 'Subject1',
           attended : 0,
          total : 0,
          percentage : 100
        });
  }
  */ 
  /*
    var user = result.user;
  
    
  
  // ...
}).catch((error)=> {
  console.log(error);
});
}

*/

}
