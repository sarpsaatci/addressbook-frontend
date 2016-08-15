import { Component } from '@angular/core';
import { Alert, NavController } from 'ionic-angular';
import { User } from '../Classes/User';
import { UserService } from '../Classes/Services';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/add/add.html',
  providers: [UserService]
})
export class Add {
	public user : User;
  constructor(private navCtrl: NavController, private UserService: UserService) {
  	this.user = new User();
  }
  
  add(){
    this.UserService.addUser(this.user).subscribe(
      data => {
        this.user = data.json();
        this.navCtrl.pop();
      },
      err => console.error(err)
      );

  };
}