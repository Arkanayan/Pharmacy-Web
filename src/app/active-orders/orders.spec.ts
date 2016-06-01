import { Component } from '@angular/core';
import {
  beforeEachProviders,
  describe,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Orders } from './orders.component.ts';
import { Title } from './title';

describe('Orders', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    AppState,
    Title,
    Orders
  ]);

  it('should have default data', inject([ Orders ], (home) => {
    expect(home.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Orders ], (home) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Orders ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
