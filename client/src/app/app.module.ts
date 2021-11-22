//Manifest for the app folder
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BookStoreModule} from './book-store/book-store.module'
import { PagesModule } from './pages/pages.module';

//Exports a global function
export function jwtTokenGetter(): string
{
  return localStorage.getItem('id_token');
}

//Decorator function
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookStoreModule,
    PagesModule,

    JwtModule.forRoot({
      config:{
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
