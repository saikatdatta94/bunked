var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
/*
  Generated class for the UsersService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('users');
    }
    // for signing up user
    UsersService.prototype.signUpUser = function (email, password) {
        var _this = this;
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then(function (newUser) {
            _this.fireAuth.signInWithEmailAndPassword(email, password).then(function (authenticatedUser) {
                _this.userProfile.child(authenticatedUser.uid + '/subjects/subject1').set({
                    name: 'Subject'
                });
                _this.userProfile.child(authenticatedUser.uid + '/subjects/subject1/data').set({
                    name: 'Subject1',
                    attended: 0,
                    total: 0,
                    percentage: 100
                });
                /*        */
            });
        });
    };
    // for signing out user
    UsersService.prototype.signoutUser = function () {
        return this.fireAuth.signOut();
    };
    /**/
    //for user log in
    UsersService.prototype.logInUser = function (email, password) {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    };
    return UsersService;
}());
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UsersService);
export { UsersService };
//# sourceMappingURL=users-service.js.map