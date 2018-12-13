import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardsComponent } from './components/cards/cards.component';
import {AuthService} from './services/auth-service.service';
import {DatabaseService} from './services/database-service.service';
import {AngularFireModule} from '@angular/fire';
import {FirebaseConfig} from '../environments/firebase.config';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {WINDOW_PROVIDERS} from './services/window-service.service';
import {MnFullpageModule} from 'ngx-fullpage';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {AngularFireDatabaseModule} from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    MnFullpageModule.forRoot(),
    SwiperModule
  ],
  providers: [
    AuthService,
    DatabaseService,
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
