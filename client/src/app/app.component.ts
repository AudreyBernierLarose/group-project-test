//Entry point - a modular approach to build an application - 
//this is not for small application, this is for robust-large applications
//This will be injected in the index.html <app-root>

//This is a code behind file that connects to our view

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookStore';
}
