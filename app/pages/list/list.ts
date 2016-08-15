import { Component } from '@angular/core';
import { Alert, NavController } from 'ionic-angular';
import { User } from '../Classes/User';
import { UserService } from '../Classes/Services';
import { Add } from '../add/add';
import { Edit } from '../edit/edit';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/list/list.html',
	providers: [UserService]
})
export class List {
	public items: Array<User>;
	public searchQuery;
	public empty: boolean;
	constructor(private navCtrl: NavController, private http: Http, private UserService: UserService) {
		this.getUserList();
		
		
	}

	ionViewDidEnter(){
		this.getUserList();
	}

	getUserList() {
		this.UserService.getUsers(null).subscribe(
			data => {
				this.items = data.json();

				if (this.items!=null && this.items.length > 0){
					this.empty = false;
				}else{
					this.empty = true;
				}
				
			},
			err => console.error(err)
			);

	}

	getItems(event) {
		this.UserService.getUsers(event.target.value).subscribe(
			data => {
				this.items = data.json();

				if (this.items!=null && this.items.length > 0){
					this.empty = false;
				}else{
					this.empty = true;
				}

			},
			err => console.error(err),
			() => console.log('getItems completed')
			);
}


doAlert(event,item) {
	let alert = Alert.create({
		title: item.firstname + ' ' + item.lastname,
		message: '<h4> Ad :</h4> '+ '<br>' + item.firstname + ' ' + item.lastname + '<br>' + '<h4> Telefon :</h4> '+ '<br>' +item.phone + '<br>' + '<h4> Email :</h4> '+ '<br>' +item.email + '<br>' + '<h4> Adres :</h4> '+ '<br>' +item.address + '<br>' + '<h4> Kurum :</h4> '+ '<br>' +item.organization + '<br>' + '<h4> Doğum Tarihi :</h4> '+ '<br>' +item.birthday + '<br>' + '<h4> Not :</h4> '+ '<br>' +item.notes + '<br>' + '<h4> İlişkisi :</h4> '+ '<br>' +item.relationship, 
		buttons: ['OK']
	});
	this.navCtrl.present(alert);
}

addNavigator(event, item) {
    this.navCtrl.push(Add, {
    	item: item
    });
}

editNavigator(event, item) {
    this.navCtrl.push(Edit, {
    	item: item
    });
}
}
