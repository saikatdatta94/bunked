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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
/**
 * Generated class for the GraphPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var GraphPage = (function () {
    function GraphPage(navCtrl, navParams, alertCtrl, angFire, fAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.angFire = angFire;
        this.fAuth = fAuth;
        this.subjectId = this.navParams.get('id');
        this.fAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid; //fetching userID from firebase
                _this.ref = firebase.database().ref('users/' + _this.userId + '/subjects/' + _this.subjectId + '/data');
                _this.ref.orderByChild('attended').on('value', function (snapshot) {
                    _this.attended = snapshot.val().attended;
                    console.log(_this.attended); //fetching value for attended
                });
                _this.ref.orderByChild('total').on('value', function (snapshot) {
                    _this.total = snapshot.val().total;
                    console.log(_this.total); //fetching value for total
                });
            }
            _this.bunked = _this.total - _this.attended;
            _this.myPercent = (_this.attended / _this.total) * 100; //calculating percent
            _this.percentDisplay = _this.myPercent.toFixed(2); //rounding upto two decimal
            console.log(_this.myPercent);
            if (_this.myPercent < 75) {
                _this.toAttend = Math.ceil(((_this.total * 0.75) - _this.attended) / 0.25);
            }
            else {
                _this.toAttend = 0;
            }
            console.log(_this.toAttend);
            if (_this.myPercent > 75) {
                _this.canBunk = Math.floor((_this.attended - (_this.total * 0.75)) / 0.75);
            }
            else {
                _this.canBunk = 0;
            }
            console.log(_this.canBunk);
            _this.fAuth.authState.subscribe(function (user) {
                if (user) {
                    _this.userId = user.uid; //fetching userID from firebase
                    console.log(_this.userId);
                    _this.dataList = _this.angFire.list('/users/' + _this.userId + '/subjects/' + _this.subjectId); //setting directory
                }
            });
        });
    }
    GraphPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GraphPage');
    };
    GraphPage.prototype.doSomethingWithCurrentValue = function ($event) {
    };
    GraphPage.prototype.attendedClicked = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure?',
            buttons: [
                {
                    text: 'Nope',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yup',
                    handler: function () {
                        console.log(_this.attended);
                        _this.ref.update({
                            "attended": _this.attended + 1,
                            "total": _this.total + 1
                        });
                        _this.myPercent = (_this.attended / _this.total) * 100;
                        _this.percentDisplay = _this.myPercent.toFixed(2); //rounding upto two decimal
                        console.log(_this.myPercent);
                    }
                }
            ]
        });
        alert.present();
    };
    GraphPage.prototype.bunkedClicked = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure?',
            buttons: [
                {
                    text: 'Nope',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yup',
                    handler: function () {
                        console.log(_this.attended);
                        _this.ref.update({
                            "total": _this.total + 1
                        });
                        _this.myPercent = (_this.attended / _this.total) * 100;
                        _this.percentDisplay = _this.myPercent.toFixed(2); //rounding upto two decimal
                        console.log(_this.myPercent);
                    }
                }
            ]
        });
        alert.present();
    };
    GraphPage.prototype.info = function () {
        this.bunked = this.total - this.attended;
        if (this.myPercent < 75) {
            this.toAttend = Math.ceil(((this.total * 0.75) - this.attended) / 0.25);
        }
        else {
            this.toAttend = 0;
        }
        if (this.myPercent > 75) {
            this.canBunk = Math.floor((this.attended - (this.total * 0.75)) / 0.75);
        }
        else {
            this.canBunk = 0;
        }
        var alert = this.alertCtrl.create({
            title: 'Info',
            message: 'Classes Attended: ' + this.attended + '<br/>' + 'Classes Bunked: ' + this.bunked + '<br/>' + 'Classes you can BUNK: ' + this.canBunk + '<br/> Classes you have to attend: ' + this.toAttend,
            buttons: [
                {
                    text: 'ok',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
            ]
        });
        alert.present();
    };
    return GraphPage;
}());
GraphPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-graph',
        templateUrl: 'graph.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController, AngularFireDatabase, AngularFireAuth])
], GraphPage);
export { GraphPage };
//# sourceMappingURL=graph.js.map