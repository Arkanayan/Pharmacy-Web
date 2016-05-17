import { Component } from '@angular/core';
import { MdList, MD_LIST_DIRECTIVES } from '@angular2-material/list'
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  directives: MD_LIST_DIRECTIVES,
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif
    }
    md-card{
      margin: 25px;
    }
  `],
  template: `
  <md-card>
    For hot module reloading run
    <pre>npm run start:hmr</pre>
  </md-card>
  <md-card>
    <h3>
      patrick@AngularClass.com
    </h3>

    <md-list>
       <md-list-item> Pepper </md-list-item>
       <md-list-item> Salt </md-list-item>
       <md-list-item> Paprika </md-list-item>
    </md-list>
  </md-card>


  `
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

}
