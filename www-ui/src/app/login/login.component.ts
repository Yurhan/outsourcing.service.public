import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/apis';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  private username: string;
  private password: string;
  private firstname: string;
  private lastname: string;
  private registerForm: boolean;

  constructor(
    private api: UserService,
    private router: Router
  ) {
    this.registerForm = false;
  }

  public ngAfterViewInit(): void {
    console.log('after init');
  }

  public login() {
    this.api.login(this.username, this.password).subscribe((result) => {
      if (result) {
        this.router.navigate(['doctor']);
      } else {
        alert('Failed to log in');
      }
    });
  }

  public register() {
    let u = {
      firstName: this.firstname,
      lastName: this.lastname,
      login: this.username,
      password: this.password,
      passwordConfirmation: this.password,
      primaryEmail: `${this.firstname}@medicaltool.com`,
      role: 1
    };
    this.api.register(u).subscribe((user) => { this.registerForm = false; });
  }
}
