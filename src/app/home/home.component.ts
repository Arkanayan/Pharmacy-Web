import { Component, AfterViewInit } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
// import * as Digits from 'digits';
  declare var Digits: any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})

export class Home implements AfterViewInit {
  Digits: any;
  loginStatus: any;
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) {



    // this.Digits = Digits;
    this.loginStatus = "hello";


  }

  ngOnInit() {
    console.log('hello `Home` component');
    console.log(Digits);
    if(!Digits.isInitialized()) {
      Digits.init({ consumerKey: "Gwga2hQKqbsL8ElziK4dgOqly"});
    }

    // this.title.getData().subscribe(data => this.data = data);
  }

  ngAfterViewInit() {
    
    Digits.getLoginStatus()
      .done(function(loginResponse) {
        if(loginResponse.status === "authorized") {
            console.log("Authorized");
        }
      }).fail((error) => console.log("failed: " + error));
  }

  submitState(value) {
    console.log('submitState', value);
    this.loginStatus = value;

    this.appState.set('value', value);
    Digits.logIn({
      phoneNumber: "+91"
    })
      .done(function(response) {
        console.log(response);
      });
   
   
  this.localState.value = '';
  }

}
