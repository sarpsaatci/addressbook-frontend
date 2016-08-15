import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../Classes/User';
import {Injectable} from '@angular/core'; 


@Injectable()
export class UserService {
    //public appServer: string = 'http://10.0.210.58:3000/entries/';
    public appServer: string = 'http://addressbook-backend.herokuapp.com/';
    constructor(private http: Http) {
        this.appServer;
    }

    public getUsers(param : string){
        if(param != null){
            let data = this.http.get(this.appServer +'entrylist/'+param)
            return data;
        }
        else{
            let data = this.http.get(this.appServer+'entrylist')
            return data;
        }
        
    }

    public addUser(user : User){

        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
        let body = user;
        return this.http.post(this.appServer+'addentry', body, options);
    }

    public updateUser(user : User){

        let body = user;
        return this.http.post(this.appServer+'updateentry/'+user._id, body);
        
        
    }

    public deleteUser(user : User){
        let id = user._id;
        let body = JSON.stringify({ id });
        return this.http.delete(this.appServer+'deleteentry/'+ user._id);
        
        
    }
}
