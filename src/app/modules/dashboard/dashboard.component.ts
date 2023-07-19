import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  subscription!: Subscription;

  constructor(public authService: AuthService, private router: Router) {
    this.subscription = authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) this.router.navigate(['/login'])
    })
  }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }

}
