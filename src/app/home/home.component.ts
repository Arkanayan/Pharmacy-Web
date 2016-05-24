import { Component, AfterViewInit } from '@angular/core';

import { AppState } from '../app.service';
import { FirebaseService } from '../firebase';
import {XLarge} from './x-large';
import { OrderBoard } from '../order-board';
// import * as Digits from 'digits';
  declare var Digits: any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge,
    OrderBoard
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})

export class Home implements AfterViewInit {

  // TypeScript public modifiers

  private orderStatus:string = "OPEN";
  constructor(public appState: AppState,private _firebase: FirebaseService ) {

  }

  ngOnInit() {
    console.log('hello `Home` Component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  ngAfterViewInit() {


  }



}
