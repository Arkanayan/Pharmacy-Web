import { Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy } from '@angular/core';
import {FirebaseService} from '../firebase/firebase.service';
import {OrderEvent} from "../models/OrderEvent";

declare var Materialize: any;
declare var firebase: any;

@Component({
  moduleId: module.id,
  selector: 'order-list',
  template: require('./order-list.component.html')
})
export class OrderList implements OnInit, OnChanges, OnDestroy {


  @Input("order_status") orderStatus: string = "OPEN";
  @Output() orderSelectedEvent: EventEmitter<any> = new EventEmitter();
  @Output() orderAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() orderRemovedEvent: EventEmitter<any> = new EventEmitter();
  @Output() orderCountChange:EventEmitter<number> = new EventEmitter();
  
  public orderList: any[] = [];
  private selectedOrder: any;
  private ordersRef: any;
  private hasInitialLoad: boolean = false;
  private orderCount:number = 0;

  private rootRef;
  constructor(private _firebase: FirebaseService) {
    this.ordersRef = firebase.database().ref('orders').orderByChild('status').equalTo("OPEN");
  }

/*  ngOnInit() {

  }*/


 ngOnChanges(changes: {}) {
    if (this.orderStatus == null) {
      this.orderStatus = "OPEN";
    }

/*
    this.ordersRef.off();
*/
    this.ordersRef = firebase.database().ref('orders').orderByChild('status').equalTo(this.orderStatus);

    this.addListener();

    var that = this;

    this.ordersRef.once('value').then(function (snapshot) {

      snapshot.forEach((childSnapshot) => {
        that.orderList.unshift(childSnapshot.val());
        that.orderCount++;
      });

      // set selectedOrder to first item
      that.selectOrder(that.orderList[0]);
      // indicate that initially data has loaded
      that.hasInitialLoad = true;
      //emit order count event
      that.orderCountChange.emit(that.orderCount);

    });




  }

  private addListener() {

    var that = this;
    // this.ordersRef = this._firebase.getRootDatabase().ref().child("orders").orderByChild('status').equalTo("OPEN");


    // add new orders to list on child add
    this.ordersRef.on('child_added', function(dataSnapshot) {

      //this.orderList.push(child);
      var order = dataSnapshot.val();
      if (that.hasInitialLoad) {
        that.orderList.unshift(order);
        Materialize.toast("New order: " + order.orderId, 2000); // 4000 is the duration of the toast
        that.orderCount++;

        let orderEvent = new OrderEvent();
        orderEvent.orderCount  = that.orderCount;
        orderEvent.orderId = order.orderId;
        
        //emit evnets
        that.orderAddedEvent.emit(orderEvent);
        that.orderCountChange.emit(that.orderCount);
      }
      // this.orderList[child.key()] = child.val();
    });


    // Reflect changes to order list
    this.ordersRef.on('child_changed',(dataSnapshot) => {
      //this.orderList.push(child);
      console.log("Changed" + dataSnapshot.val().orderId);
      // this.orderList.unshift(child.val());
      let pos : number = this.orderList.map(function(e) { return e.orderPath; }).indexOf(dataSnapshot.val().orderPath);
      console.log("Pos: " + pos);
      this.orderList[pos] = dataSnapshot.val();
    });

    // delete order from order list
    this.ordersRef.on('child_removed', function(data) {
      let pos : number = that.orderList.map(function(e) { return e.orderPath; }).indexOf(data.key);
      console.log("order deleted at pos: " + pos);
      let order = data.val();
      // delete element from ordersList array
      if (pos > -1) {
        that.orderList.splice(pos, 1);

        that.orderCount--;
        
        let orderEvent = new OrderEvent();
        orderEvent.orderCount  = that.orderCount;
        orderEvent.orderId = order.orderId;
        
        // emit events
        that.orderRemovedEvent.emit(orderEvent);
        that.orderCountChange.emit(that.orderCount);

      }


    });
  }

  ngOnDestroy() {
    this.ordersRef.off();
    console.log("On destroy order list");

  }

  selectOrder(order) {
    this.selectedOrder = order;
    this.orderSelectedEvent.emit(this.selectedOrder);
  }
}
