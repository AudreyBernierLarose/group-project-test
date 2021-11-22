//This is the controller that controls the view
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

//Typescript class that is being exported, this is the code behind
//It becomes accessible to anyone of the component
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void 
  {
    this.user = new User();
  }

  onLogoutClick() : void
  {
    this.authService.logout().subscribe(data => {
      this.router.navigate(['/login']); //Takes user back to login page
      });
  }

  isLoggedIn(): boolean
  {
    const result = this.authService.authenticated;
    if(result)
    {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }

}
