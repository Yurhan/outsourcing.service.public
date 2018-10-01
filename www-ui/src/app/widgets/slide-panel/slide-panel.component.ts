import { Component, Input } from '@angular/core';

const CONTENT_STATES = Object.freeze({
  open: 'open',
  closed: 'closed'
});

@Component({
  selector: 'slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss']
  // ,
  // animations: [
  //   trigger('slideInOut', [
  //     state(CONTENT_STATES.closed, style({
  //       transform: 'translate3d(0, 0, 0)'
  //     })),
  //     state(CONTENT_STATES.open, style({
  //       transform: 'translate3d(0, 100%, 0)'
  //     })),
  //     transition(`${CONTENT_STATES.closed} => ${CONTENT_STATES.open}`, animate('400ms ease-in-out')),
  //     transition(`${CONTENT_STATES.closed} => ${CONTENT_STATES.open}`, animate('400ms ease-in-out'))
  //   ])
  // ]
})
export class SlidePanelComponent {

  @Input() public contentState = CONTENT_STATES.closed;
  @Input() public title: string;

  public isClosed = false;

  constructor(
  ) {
    console.log('SlidePanelComponent.constructor');
  }

  public ngAfterViewInit(): void {
    console.log('SlidePanelComponent.ngAfterViewInit');
  }

  public tooglePanelContent(event: any): boolean {
    event.stopPropagation();
    event.preventDefault();
    console.log('bedore', this.isClosed);
    // this.isClosed = !this.isClosed;
    // this.contentState = this.contentState === CONTENT_STATES.closed
    //   ? CONTENT_STATES.open
    //   : CONTENT_STATES.closed;

    console.log('After is closed', this.isClosed);
    return false;
  }

  // public isClosed(): boolean {
  //   return this.contentState === CONTENT_STATES.closed;
  // }
}
