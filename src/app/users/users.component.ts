import {Component, OnInit, OnDestroy} from '@angular/core';
import {FirebaseService} from '../firebase';
import {RouterLink, Router } from '@angular/router-deprecated'

@Component({
  moduleId: module.id,
  selector: 'users',
  directives: [RouterLink],
  template: require('./users.component.html'),
  styles: [require('./users.component.css')]
})
export class Users implements OnInit, OnDestroy {


  private usersList: any[] = [];
  private usersRef;
  private selectedUser: any;

  constructor(private _firebase: FirebaseService, private router:Router) {

    this.usersRef = this._firebase.getRootDatabase().ref('users');

  }

  ngOnInit() {

    this.usersRef.on('value', (dataSnapshot) => {

      if(this.usersList.length > 0 ) {
        this.usersList = [];
      }
      dataSnapshot.forEach((childSnapshot) => {

        this.usersList.push(childSnapshot.val());
      });

    });

  }

  selectUser(event, user) {
    event.preventDefault();
    this.selectedUser = user;
  }

  ngOnDestroy() {
    this.usersRef.off();
  }

}
