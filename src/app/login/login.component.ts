import {Component, OnInit} from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';

@Component({
  moduleId: module.id,
  selector: 'login',
  template: require('./login.component.html'),
  directives: [MaterializeDirective]
})

export class Login implements OnInit {

  title:any = "Login";

  constructor() {

    this.title = "Now";
  }

  ngOnInit() {

    console.log("order detail");
  }

}
