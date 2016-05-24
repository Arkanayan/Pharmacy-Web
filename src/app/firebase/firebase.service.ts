import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Rx from 'rxjs/Rx';

declare var firebase:any;

@Injectable()
export class FirebaseService {

  constructor(private http: Http) {
    var config = {
      apiKey: "AIzaSyDgtOcgj-x_C-OsMJLFCu1Uqp4VLp16A-g",
      authDomain: "ahana-pharmacy-ffe04.firebaseapp.com",
      databaseURL: "https://ahana-pharmacy-ffe04.firebaseio.com",
      storageBucket: "ahana-pharmacy-ffe04.appspot.com",
    };
    firebase.initializeApp(config);

  }

 public getFirebase() {

    return firebase;
  }

  public getUserFromToken(token: string) {
    return Rx.Observable.create(function (observer) {
      firebase.auth().signInWithCustomToken(token).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.Message;
        observer.error(errorCode);
        //  throw Error(errorCode);
        //  return Observable.throw(errorCode);

      });
      var auth:any = firebase.auth();
      auth.onAuthStateChanged(function(user) {
        if (user) {
          observer.next(user);
          observer.complete();
          
        } else {
          observer.error("User not found");
        }
      });
      return function() {
      }
    });
  }

   /*
   *  @returns token 
   */
   public getToken(digitsCreds) {
     var loginData = {
      "credentials": digitsCreds['X-Verify-Credentials-Authorization'],
      "provider": digitsCreds['X-Auth-Service-Provider']
    };
    
    var authUrl: string = "https://appadmin-apharmacy.rhcloud.com/getToken";

     var params = "X-Auth-Service-Provider=" + loginData.provider + "&X-Verify-Credentials-Authorization=" +
                  loginData.credentials;

     // to make it not encode, i.e. send as it is
     params = encodeURI(params);
     var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(authUrl, params, {
      headers: headers
    }).map(body => body.text());
     
   }
   
   public getCurrentUser() {
     return this.getFirebase().auth().currentUser;
   }
   
   // Logout current user
   public logout() {
      this.getFirebase().auth().signOut();
      localStorage.clear();
   }
   
   /*
   *  Checks if the user is admin or not
   *  ret true
   */
   public checkIfAdmin(user: any):Rx.Observable<boolean> {
     
     return Rx.Observable.create((observer) => {
       if (user != null) {
         let uid:string = user.uid;
         firebase.database().ref('configs/roles/admin/' + uid).on('value', function(snapshot) {
           if (snapshot != null) {
             observer.next(snapshot.val());
           } else {
             console.log("Snapshot is null");
             observer.error("User not found");
           }
         });
       } else {
         console.log("User is null");         
         observer.error("Unable to fetch user");
       }
     });
   }
   
   /*
   *  Returns root firebase database
   */
  public getRootDatabase() {
   return firebase.database();
  }

}
