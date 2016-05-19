import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'order-detail',
    template: require('./order-detail.component.html')
})

export class OrderDetail implements OnInit {

    title:any = "Order Detail";

    constructor() {

      this.title = "Now";
     }

    ngOnInit() {

        console.log("order detail");
    }

}
