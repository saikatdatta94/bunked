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
import { LoginPage } from '../login/login';
import { GraphPage } from '../graph/graph';
import { NavController, AlertController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
var HomePage = (function () {
    /*
     user: Observable<firebase.User>;
  */
    function HomePage(navCtrl, usersService, alertCtrl, angFire, fAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.usersService = usersService;
        this.alertCtrl = alertCtrl;
        this.angFire = angFire;
        this.fAuth = fAuth;
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('users');
        this.fAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid;
                console.log(_this.userId);
                _this.subjects = _this.angFire.list('/users/' + _this.userId + '/subjects'); //setting add subject and loop directory
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
    HomePage.prototype.signUserOut = function () {
        var _this = this;
        this.usersService.signoutUser().then(function () {
            _this.navCtrl.setRoot(LoginPage);
        });
    };
    /**/
    HomePage.prototype.addSubject = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        // authentication and getting user id
                        _this.fAuth.authState.subscribe(function (user) {
                            if (user) {
                                _this.userId = user.uid;
                                console.log(_this.userId);
                                _this.subjects = _this.angFire.list('/users/' + _this.userId + '/subjects'); //setting add subject and loop directory
                            }
                        });
                        //end of fetching id
                        _this.subjects.push({
                            name: data.name,
                            data: {
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
    };
    HomePage.prototype.editSubject = function (subject) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var newName = subject.name;
                        if (data.name != '') {
                            newName = data.name;
                        }
                        _this.subjects.update(subject.$key, {
                            name: newName,
                        });
                        _this.subjects.update(subject.$key + '/data', {
                            name: newName,
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.deleteSubject = function (subjectID) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Delete',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function (data) {
                        _this.subjects.remove(subjectID);
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.redirectToGraph = function (subjectId) {
        var data = {
            id: subjectId,
        };
        console.log(subjectId);
        //this.fetchSubjectId = subjectId;
        this.navCtrl.push(GraphPage, data);
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [UsersService]
    }),
    __metadata("design:paramtypes", [NavController, UsersService, AlertController, AngularFireDatabase, AngularFireAuth])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map