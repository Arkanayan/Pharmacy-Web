import {Component, AfterViewInit} from '@angular/core';

import {AppState} from '../app.service';
import {FirebaseService} from '../firebase';
import {OrderBoard} from '../order-board';
import { MaterializeDirective } from 'angular2-materialize';
import {OrderEvent} from "../models/OrderEvent";
import {OrderStatus} from "../models/OrderStatus";
// import * as Digits from 'digits';
declare var Materialize: any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'active-orders'
  selector: 'order-history',  // <active-orders></active-orders>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    OrderBoard,
    MaterializeDirective
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./history.component.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./history.component.html')
})

export class History implements AfterViewInit {

  // TypeScript public modifiers

  public title: string = "History"

  private canceledStatus:string = OrderStatus[OrderStatus.CANCELED];
  private completedStatus:string = OrderStatus[OrderStatus.COMPLETED];

  constructor(public appState:AppState, private _firebase:FirebaseService) {

  }

  ngOnInit() {
    // this.title.getData().subscribe(data => this.data = data);
  }

  ngAfterViewInit() {


  }


}
