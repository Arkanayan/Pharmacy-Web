import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader, OnInit} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
import {Login} from '../login';
import { FirebaseService } from '../firebase';

@Directive({
  selector: 'router-outlet'
})

export class LoggedInRouterOutlet extends RouterOutlet implements OnInit {
  publicRoutes: any;
  private parentRouter: Router;

  private currentUser;


  ngOnInit() {

  }
  constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, @Attribute('name') nameAttr: string, private _auth: FirebaseService) {

    super(_viewContainerRef, _loader, _parentRouter, nameAttr);
    this.parentRouter = _parentRouter;
    // The Boolean following each route below 
    // denotes whether the route requires authentication to view
    this.publicRoutes = {
      'Login': true
    };

  }

  activate(instruction: ComponentInstruction) {
    let url = instruction.urlPath;
    
    // if (!this.publicRoutes[url] && !this._auth.getFirebase().currentUser) {
    //   this.parentRouter.navigateByUrl('/login');
    // }

    if (!this.publicRoutes[url] && !localStorage.getItem("logged_in")) {

      this.parentRouter.navigateByUrl('/login');

    }
    return super.activate(instruction);
  }


}