/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {AppState} from './app.service';
import {Orders} from './active-orders';
// import {RouterActive} from './router-active';
import {OrderDetail} from './order-detail';
import {Login} from './login';
import {LoggedInRouterOutlet} from './logged-in-outlet';
import {Dashboard} from "./dashboard/dashboard.component";
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [LoggedInRouterOutlet],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
        <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/...', component: Dashboard, as: 'Dashboard' , useAsDefault: true},
  { path: '/login', component: Login, as: 'Login' },
])


export class App {


  constructor(public appState:AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);

  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
