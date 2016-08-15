import { Component } from '@angular/core';
import { NavController, NavParams, Alert } from 'ionic-angular';
import { User } from '../Classes/User';
import { UserService } from '../Classes/Services';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/edit/edit.html',
	providers: [UserService]
})
export class Edit {
	public user : User;

	constructor(private navCtrl: NavController, private navParams: NavParams, private UserService: UserService ) {
		this.user = navParams.get('item');

	}

	update(){
		this.UserService.updateUser(this.user).subscribe(
            data => {
                this.user = data.json();
                this.navCtrl.pop();
            },
            err => console.error(err),
            () => console.log('editUser completed')
            );
		
	}

	delete(){
		this.UserService.deleteUser(this.user).subscribe(
            data => {
                this.navCtrl.pop();
            },
            err => console.error(err),
            () => console.log('editUser completed')
            );
	}
}