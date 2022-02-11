import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
usserLogged=this.authService.getUserLogged();
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }


logout(){
  this.authService.logout();
  this.router.navigate(['/login']);
}


}
