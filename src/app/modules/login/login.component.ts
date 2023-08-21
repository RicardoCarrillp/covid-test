import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Subscription, tap} from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subscription!: Subscription;
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
    this.loginForm=this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

  login(){
    this.subscription= this.authService.login(this.loginForm.value.username).pipe(
      tap(() => this.router.navigate(['dashboard'])),
      tap(()=> localStorage.removeItem('dataForState'))
    ).subscribe();
  }

}
