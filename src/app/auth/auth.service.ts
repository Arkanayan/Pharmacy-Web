import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class AuthService {

  constructor() {
    var config = {
    apiKey: "AIzaSyDgtOcgj-x_C-OsMJLFCu1Uqp4VLp16A-g",
    authDomain: "ahana-pharmacy-ffe04.firebaseapp.com",
    databaseURL: "https://ahana-pharmacy-ffe04.firebaseio.com",
    storageBucket: "ahana-pharmacy-ffe04.appspot.com",
  };
    console.log("firebase");
    firebase.initializeApp(config);
  }

  getFirebase() {

    return firebase;
  }

}
