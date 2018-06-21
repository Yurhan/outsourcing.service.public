import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/apis';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('header') private header: ElementRef;
  private scrolling = false;
  private previousTop = 0;
  // private currentTop = 0;
  private scrollDelta = 10;
  private scrollOffset = 150;
  constructor(
    private router: Router,
    private userService: UserService
  ) {

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.scrolling) {
      this.scrolling = true;
      (!window.requestAnimationFrame)
        ? setTimeout(this.autoHideHeader.bind(this), 250)
        : requestAnimationFrame(this.autoHideHeader.bind(this));
    }
  }

  private autoHideHeader() {
    let currentTop = window.scrollY;

    this.checkSimpleNavigation(currentTop);

    this.previousTop = currentTop;
    this.scrolling = false;
  }
  public logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
  private checkSimpleNavigation(currentTop) {
    // there's no secondary nav or secondary nav is below primary nav
    if (this.previousTop - currentTop > this.scrollDelta) {
      // if scrolling up...
      this.header.nativeElement.classList.remove('is-hidden');
    } else if (currentTop - this.previousTop > this.scrollDelta && currentTop > this.scrollOffset) {
      // if scrolling down...
      this.header.nativeElement.classList.add('is-hidden');
    }
  }
}
