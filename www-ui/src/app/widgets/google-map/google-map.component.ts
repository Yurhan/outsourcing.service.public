import { Component, OnInit, Input } from '@angular/core';
import { GoogleMapService } from '../../../services/apis';
import { IAddress, ILocation } from '../../../models';

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  public lat: number;
  public lng: number;
  public zoom = 17;

  @Input() address: IAddress;

  constructor(
    private googleMapService: GoogleMapService
  ) {
  }

  ngOnInit(): void {

    // this.googleMapService.getApiKey().subscribe((key) => {
    this.googleMapService.getLocation(this.address)
      .subscribe((location) => {
        console.log(location);
        this.lat = location.lat;
        this.lng = location.lng;
      });
    // });
  }
}
