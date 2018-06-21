import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/apis';

import '../styles/main.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  public ngAfterViewInit(): void {
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
