import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: 'wallet'
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: 'filing'
    },
    {
      title: 'Locations',
      url: '/locations',
      icon: 'globe'
    },
    {
      title: 'People',
      url: '/people',
      icon: 'people'
    },
    {
      title: 'Tags',
      url: '/tags',
      icon: 'pricetags'
    },
    // {
    //   title: 'About',
    //   url: '/about',
    //   icon: 'information'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiSvc: ApiService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
