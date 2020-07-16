import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user';
import { Respsck } from '../model/respsck';
import { AES , enc} from 'crypto-ts';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  userregister(obj: User): Observable<Respsck>{
    return this.http.post<Respsck>(environment.SERVER_URL + '/server/add', obj);
  }
  userlogin(email: string, password: string): Observable<User>{
    return this.http.post< User>(environment.SERVER_URL + '/server/login', { email, password});
  }

  product_list(): Observable<Product[]>{
    return this.http.get<Product[]>(environment.SERVER_URL + '/product/list');
  }
  product_add(obj: Product): Observable<Respsck>{
    return this.http.post<Respsck>(environment.SERVER_URL + '/product/add', obj);
  }
  product_update(obj: Product): Observable<Respsck>{
    return this.http.post<Respsck>(environment.SERVER_URL + '/product/update', obj);
  }
  product_delete(id: number): Observable<Respsck>{
    return this.http.post<Respsck>(environment.SERVER_URL + '/product/delete', {id});
  }

  setuser(user: User){
    const ciphertext = AES.encrypt(JSON.stringify(user), environment.ENC_PASSWORD);

    sessionStorage.setItem('user', ciphertext.toString());
  }
  getuser(): User{
    if (sessionStorage.getItem('user') != null) {
    const encrypt = sessionStorage.getItem('user');
    const bytes  = AES.decrypt(encrypt.toString(), environment.ENC_PASSWORD);
    const plaintext = bytes.toString(enc.Utf8);
    return JSON.parse(plaintext);
    }
    return null;
}


  alert(type: string, message: string, action?: string, timeout?: number ){

    action = action == null ? 'ok' : action;
    timeout = timeout == null ? 5000 : timeout;
    this.snackBar.open(message, action, {
      duration: timeout, panelClass: type


    });
  }
}

