import {Component, OnInit, Input, OnDestroy, OnChanges} from '@angular/core';
import {FirebaseService} from '../firebase/firebase.service';
import {MaterializeDirective} from 'angular2-materialize';
// import 'lightbox2';

declare var Materialize:any;
declare var cloudinary:any;

@Component({
  moduleId: module.id,
  selector: 'order-detail',
  template: require('./order-detail.component.html'),
  styles: [require('./order-detail.component.css')],
  directives: [MaterializeDirective]
})

export class OrderDetail implements OnInit, OnDestroy, OnChanges {


  @Input("order_path") orderPath:any;
  private orderRef:any;
  private order:any;
  private user:any;
  private address:any;
  private userRef:any;
  private addressRef:any;
  private cloudinary:any;
  private prescriptionUrl:string = "assets/img/prescription.svg";
  private prescriptionUrlThumb:string = "assets/img/prescription.svg";

  private status_array:string[] = ['PENDING', 'ACKNOWLEDGED', 'CONFIRMED', 'CANCELED', 'CLOSED']

  constructor(private _firebase:FirebaseService) {
    this.orderRef = this._firebase.getRootDatabase().ref("orders/");
    this.userRef = this._firebase.getRootDatabase().ref("users/");
    this.addressRef = this._firebase.getRootDatabase().ref("addresses/");

    this.cloudinary = cloudinary.Cloudinary.new({cloud_name: "dvlr2z7ge"});


  }

  ngOnInit() {


  }

  ngOnChanges(changes:{}) {
    this.bindOrderListener();
  }

  bindOrderListener() {
    /*
     this.orderRef.off();
     */
    this.orderRef = this._firebase.getRootDatabase().ref("orders/" + this.orderPath);
    var that = this;

    this.orderRef.on('value', function (snapshot) {

      that.order = snapshot.val();
      that.fetchUser();
      that.fetchAddress();

      if (that.order.prescriptionUrl.length > 0) {
        that.prescriptionUrl = that.cloudinary.url(that.order.prescriptionUrl + ".jpg");
        that.prescriptionUrlThumb = that.cloudinary.url(that.order.prescriptionUrl + ".jpg", {height: 75, quality: 30, width: 75, crop: "limit"});
      } else {
        that.prescriptionUrl = "assets/img/prescription.svg";
        that.prescriptionUrlThumb = "assets/img/prescription.svg";

      }
    });

  }

  private fetchUser() {
    if (this.order != null) {

      this.userRef = this._firebase.getRootDatabase().ref("users/" + this.order.uid);

      this.userRef.on('value', (snapshot) => {
        this.user = snapshot.val();
      });
    }
  }

  private fetchAddress() {
    if (this.order != null) {

      this.addressRef = this._firebase.getRootDatabase().ref("addresses/" + this.order.uid);

      this.addressRef.on('value', (snapshot) => {
        var that = this;
        snapshot.forEach((value) => {
          this.address = value.val();
          return;
        });
      });
    }

  }

  private updateOrder() {

    if (this.order) {
      var orderData = {
        price: this.order.price,
        shippingCharge: this.order.shippingCharge,
        status: this.order.status,
        sellerNote: this.order.sellerNote
      };

      this.orderRef.update(orderData, (success) => {
        if (success == null) {
          Materialize.toast("Order updated", 2000);
        } else {
          Materialize.toast("Order update failed", 2000);
        }
      });
    }
  }

  ngOnDestroy() {

    this.orderRef.off();
    this.userRef.off();
    this.addressRef.off();
    console.log("On destroy order detail");

  }
}
