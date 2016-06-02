import {Component, OnInit, Input, OnChanges, OnDestroy} from '@angular/core';
import {FirebaseService} from '../firebase'

declare var Materialize: any;

@Component({
    moduleId: module.id,
    selector: 'user-detail',
    template: require('user-detail.component.html')
})
export class UserDetail implements OnChanges,OnDestroy {



    @Input() uid:string;
    isEditable: boolean = false;
    private user: any;
    private address:any;
    private userRef: any;
    private addressRef: any;
    private addressKey: any;


    constructor(private _firebase: FirebaseService) {

      this.userRef = this._firebase.getRootDatabase().ref("users/");
      this.addressRef = this._firebase.getRootDatabase().ref("addresses/");

    }

  ngOnChanges(changes:{}) {

      if (this.uid != null) {

        this.userRef = this._firebase.getRootDatabase().ref("users/" + this.uid).on('value', (snapshot) => {
          if (snapshot.exists()) {
            this.user = snapshot.val();
            // this.showUser(this.user);
            this.fetchAddress();
          }
        });
      }
  }

  showUser(currentUser:any) {

  }

  private fetchAddress() {
    if (this.user != null) {

      this.addressRef = this._firebase.getRootDatabase().ref("addresses/" + this.user.uid);

      this.addressRef.on('value', (snapshot) => {
        var that = this;
        snapshot.forEach((value) => {
          this.address = value.val();
          this.addressKey = value.key();
          return;
        });
      });
    }

  }

  updateAddress() {

    if(this.address) {

      var addressData = {
        addressLine1: this.address.addressLine1,
        addressLine2: this.address.addressLine2,
        landmark: this.address.landmark,
        pin: this.address.pin
      };

      this.addressRef.ref(this.addressKey).update(addressData, (success) => {
        if (success == null) {
          Materialize.toast("Address updated", 2000);
        } else {
          Materialize.toast("Address update failed", 2000);
        }
      });
    }
  }

  updateUser() {

      if (this.user) {
        var userData = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          emailAddress: this.user.emailAddress,
        };

        this.userRef.update(userData, (success) => {
          if (success == null) {
            Materialize.toast("User updated", 2000);
          } else {
            Materialize.toast("User update failed", 2000);
          }
        });

      }
  }

  ngOnDestroy() {
    this.addressRef.off();
    this.userRef.off();
  }
}
