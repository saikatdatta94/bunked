import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,private socialSharing: SocialSharing) {

  }



shareWhatsapp(){

this.socialSharing.shareViaWhatsApp('Bunked: Easiest way to manage the attendance','','https://play.google.com/store/apps/details?id=com.ionicframework.bunked404973').then(() => {
  // Success!
}).catch(() => {
  
});
}
}
