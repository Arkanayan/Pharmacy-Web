import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Component({
  moduleId: module.id,
  selector: 'order-detail',
  template: require('./order-detail.component.html')
})

export class OrderDetail implements OnInit, OnDestroy, OnChanges {




  @Input("order_path") orderPath: any;
  private orderRef: any;
  private order: any;

  constructor(private _firebase: FirebaseService) {
    this.orderRef = this._firebase.getRootDatabase().ref("orders/");
  }

  ngOnInit() {



  }
  ngOnChanges(changes:{}) {
    this.bindOrderListener();
  }

  bindOrderListener() {
    this.orderRef.off();
    this.orderRef = this._firebase.getRootDatabase().ref("orders/" + this.orderPath);
    var that = this;
    
    this.orderRef.on('value', function (snapshot) {
      that.order = snapshot.val();
      console.log(that.order.orderId);
    });
    
    

  }


  ngOnDestroy() {

    this.orderRef.off();
  }
}
