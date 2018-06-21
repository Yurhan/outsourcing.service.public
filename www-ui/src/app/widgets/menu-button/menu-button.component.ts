import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {

  @Input() public navigateTo: string;
  @Input() public text: string;
  constructor(
  ) {
  }
}
