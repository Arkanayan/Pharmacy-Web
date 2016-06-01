import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, RouterLink} from '@angular/router-deprecated';
import {LoggedInRouterOutlet} from '../logged-in-outlet';
import {Orders} from "../active-orders/orders.component";
import {History} from '../history';
import {MaterializeDirective} from 'angular2-materialize';
import {RouterActive} from '../router-active';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  directives: [LoggedInRouterOutlet, MaterializeDirective, RouterLink, RouterActive],
  template: require('./dashboard.component.html'),
  styles: [require('./dashboard.component.css')]
})

@RouteConfig([
  {path: '/orders', component: Orders, as: 'Orders', useAsDefault: true},
  {path: '/history', component: History, as: 'History'}
])

export class Dashboard implements OnInit {
  constructor(private router:Router) {
  }

  ngOnInit() {
  }

}
