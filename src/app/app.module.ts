import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule,BrowserXhr} from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType, HttpService, CustomPreloadingStrategy,/* CustomBrowserXhr*/} from './app.service';

import { HomeComponent } from './home';
import { DetailComponent } from './detail/detail.component';
import { CollectComponent } from './collect/collect.component';
import { CallingComponent } from './filter/calling.component';
import { CalledComponent } from './filter/called.component';
import { NoContentComponent } from './no-content';


import { ShareModule } from './common/common.module';


import '../styles/font.css';
import '../styles/styles.scss';

// import '../styles/headings.css';


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
    ,[HTTP_PROVIDERS, provide(BrowserXhr, { useClass: CustomBrowserXhr })]
 */
@NgModule({
  bootstrap: [ AppComponent],
  declarations: [
    AppComponent,
    DetailComponent,
    CollectComponent,
    CallingComponent,
    CalledComponent,
    HomeComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ShareModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: CustomPreloadingStrategy/*, preloadingStrategy: PreloadAllModules*/ })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    CustomPreloadingStrategy,
    HttpService
  ]
})


export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }

    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
