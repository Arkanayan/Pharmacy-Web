import {Component, OnInit, OnDestroy } from '@angular/core';
import {FirebaseService} from "../firebase/firebase.service";

declare var Digits:any;
declare var Materialize:any;

@Component({
  moduleId: module.id,
  selector: 'login',
  template: require('./login.component.html'),
  directives: [],
  styles: [require('./login.component.css')]
})

export class Login implements OnInit {

  title:any = "Login";
  private user:any = null;
  
  constructor(private _auth:FirebaseService) {
    var that = this;
     this._auth.getFirebase().auth().onAuthStateChanged(function(firebaseUser) {
     if (firebaseUser) {
      // User is signed in.
      that.user = firebaseUser;
      } else {
       // No user is signed in.
      }
    });
  }

  ngOnInit() {


    if (!Digits.isInitialized()) {
      Digits.init({consumerKey: "Gwga2hQKqbsL8ElziK4dgOqly"});
    }
  }


  login(event) {

    Digits.logIn({
      phoneNumber: "+91"
    })
      .done((response) => this.doLogin(response))
      .fail(function () {
        console.log("Login failed");

        Materialize.toast("Login failed", 2000);
      });
  }

  showLoginFailure() {
  }

  doLogin(loginResponse) {

    var oAuthHeaders = loginResponse.oauth_echo_headers;

    // this._auth.getToken(oAuthHeaders)
    //   .subscribe(function (response) {
    //     console.log("hello");
    //     console.log(response);
    //   }, function (error) {

    //     console.log("error occurred");
    //     console.log(error);
    //   });

    this._auth.getToken(oAuthHeaders)
        .flatMap((token) => this._auth.getUserFromToken(token))
        .flatMap((user) => this._auth.checkIfAdmin(user))
        .subscribe((isAdmin) => {
          if (isAdmin) {
            console.log("You are admin");
            
            localStorage.setItem("logged_in", this._auth.getCurrentUser().uid);
            Materialize.toast("Welcome", 4000);
          } else {
            console.log("Your are not admin");
            this._auth.logout();
          }
        });

  }

}
