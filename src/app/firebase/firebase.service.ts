import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

declare var firebase:any;

@Injectable()
export class FirebaseService {

  constructor(private http:Http) {
    //TODO ADD firebae config here
    //Check here https://firebase.google.com/docs/web/setup
    var config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: "",
    };
    firebase.initializeApp(config);

  }

  public getFirebase() {

    return firebase;
  }

  public getUserFromToken(token:string) {
    return Observable.create(function (observer) {
      firebase.auth().signInWithCustomToken(token).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.Message;
        observer.error(errorCode);
        //  throw Error(errorCode);
        //  return Observable.throw(errorCode);

      });
      // Add delay so it auth() gets proper time to initialize
      var authInterval = setInterval(() => {
        var auth:any = firebase.auth();
        auth.onAuthStateChanged(function (user) {
          if (user) {
            observer.next(user);
            observer.complete();

          } else {
            observer.error("User not found");
          }
        });
      }, 2000);

      return function () {
        clearInterval(authInterval);
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
    
    //TODO replace authUrl with your own server's getToken endpoint
    var authUrl:string = "https://appadmin-apharmacy.rhcloud.com/getToken";

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
  public checkIfAdmin(user:any):Observable<boolean> {

    return Observable.create((observer) => {
      if (user != null) {
        let uid:string = user.uid;
        firebase.database().ref('configs/roles/admin/' + uid).on('value', function (snapshot) {
          if (snapshot.exists()) {
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
