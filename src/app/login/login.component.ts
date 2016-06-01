import {Component, OnInit, OnDestroy } from '@angular/core';
import {FirebaseService} from "../firebase/firebase.service";
import {Router} from '@angular/router-deprecated';

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

  constructor(private _firebase:FirebaseService, private _router: Router) {
    var that = this;
     this._firebase.getFirebase().auth().onAuthStateChanged(function(firebaseUser) {
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
      Digits.init({consumerKey: "V2KKuYwX79FOjznZJ4opyoTK1"});
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

    this._firebase.getToken(oAuthHeaders)
        .flatMap((token) => this._firebase.getUserFromToken(token))
        .flatMap((user) => this._firebase.checkIfAdmin(user))
        .subscribe((isAdmin) => {
          if (isAdmin) {
            console.log("You are admin");

            localStorage.setItem("logged_in", this._firebase.getCurrentUser().uid);
            Materialize.toast("Welcome", 4000);

            // redirect to active-orders page
            this._router.navigate(['/Dashboard']);
          } else {
            console.log("Your are not admin");
            this._firebase.logout();
            Materialize.toast("Sorry, Login Failed", 4000);

          }
        }, (loginError) => {
          Materialize.toast("Sorry, Login Failed", 4000);
        } );

  }

}
