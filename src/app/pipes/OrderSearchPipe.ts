/**
 * Created by arka on 27/5/16.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderFilter',
  pure: false
})
export class OrderSearchPipe implements PipeTransform {

  transform(value:any, orderId:string):any {

    return value.filter(function (order) {
       // console.log(order.orderId);
      if (!orderId){
        return true;
      }
      var re = new RegExp("OD"+orderId+"","i");
      return re.test(order.orderId);
    });

  }



}
