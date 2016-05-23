import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Rx from 'rxjs/Rx';

declare var firebase:any;

@Injectable()
export class AuthService {

  constructor(private http: Http) {
    var config = {
      apiKey: "AIzaSyDgtOcgj-x_C-OsMJLFCu1Uqp4VLp16A-g",
      authDomain: "ahana-pharmacy-ffe04.firebaseapp.com",
      databaseURL: "https://ahana-pharmacy-ffe04.firebaseio.com",
      storageBucket: "ahana-pharmacy-ffe04.appspot.com",
    };
    firebase.initializeApp(config);

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOiI3MjIwNjg0NTIxNTcwOTE4NDAiLCJpYXQiOjE0NjM5ODQ1MTcsImV4cCI6MTQ2Mzk4ODExNywiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJpc3MiOiJhaGFuYS1waGFybWFjeS1iYWNrZW5kLWF1dGhAYWhhbmEtcGhhcm1hY3ktZmZlMDQuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJhaGFuYS1waGFybWFjeS1iYWNrZW5kLWF1dGhAYWhhbmEtcGhhcm1hY3ktZmZlMDQuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.eEk-uzy_fKlJXmMF3KW3mZxmXg5M4y4sMmQdtS1tWiUhS3rw34m__WNalvF4DwVG06zUCJU_aglts7szRjyGCsRZupVAJ0QVolWsEbf4K_qjgK6G2IZuTNczO6uUUK0kRWbVMTw6T2y6-L-hN1s_HfjAWiiBCdjz4xD4dgIm46vPsWp2KxDIjTr-6nOKobBnZAfVcsy0oQJm0MV96dURESbbqiyumkT1kr0dB5cYV2PTCfL32zj9pKJaVqsCsurpoKetmJbK6dQ5NpZMtiJoASNErckQpL2ZsUzuRK1GDDxmAxo1-hIZCot4ZCjjghRnrgK25AXr3H95e1JKfjK7iw";

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
      
       observer.next(firebase.auth().currentUser);
       observer.complete();
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
   
   // Logout current user
   public logout() {
      this.getFirebase().auth().signOut();
   }
   
   /*
   *  Checks if the user is admin or not
   *  ret true
   */
   public checkIfAdmin(user: any):Rx.Observable<boolean> {
     
     return Rx.Observable.create((observer) => {
       if (user != null) {
         let uid:string = user.uid;
         firebase.database().ref('users/' + uid + '/admin').on('value', function(snapshot) {
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

}
