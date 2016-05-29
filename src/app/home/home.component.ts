import {Component, AfterViewInit} from '@angular/core';

import {AppState} from '../app.service';
import {FirebaseService} from '../firebase';
import {XLarge} from './x-large';
import {OrderBoard} from '../order-board';
import { MaterializeDirective } from 'angular2-materialize';
import {OrderEvent} from "../models/OrderEvent";
import {OrderStatus} from "../models/OrderStatus";
// import * as Digits from 'digits';
declare var Materialize: any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge,
    OrderBoard,
    MaterializeDirective
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./home.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})

export class Home implements AfterViewInit {

  // TypeScript public modifiers

  private orderStatus:string = OrderStatus[OrderStatus.PENDING];
  private confirmStatus:string = OrderStatus[OrderStatus.CONFIRMED];
  private acknowledgedStatus:string = OrderStatus[OrderStatus.ACKNOWLEDGED];

  constructor(public appState:AppState, private _firebase:FirebaseService) {

  }

  ngOnInit() {
    // this.title.getData().subscribe(data => this.data = data);
  }

  statusOpen() {
    this.orderStatus = OrderStatus[OrderStatus.PENDING];
  }

  statusConfirmed() {
    this.orderStatus = OrderStatus[OrderStatus.CONFIRMED];
  }

  ngAfterViewInit() {


  }

  selectOrder(evnet) {
    console.log("from home selected");
  }

  newOrder(orderEvent: OrderEvent) {
    console.log("new order: " + orderEvent.orderId);
    Materialize.toast("New order: " + orderEvent.orderId, 4000);
  }

}
