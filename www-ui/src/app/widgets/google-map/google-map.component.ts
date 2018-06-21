import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { GoogleMapService } from '../../../services/apis';
import { IAddress } from '../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  public mapUrl: string;

  @Input() address: IAddress

  constructor(
    private googleMapService: GoogleMapService
  ) {
  }

  ngOnInit(): void {

    this.googleMapService.getApiKey().subscribe((key) => {
      this.googleMapService.getLocation(this.address)
        .subscribe((location) => {
          this.mapUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
        })
    });
  }

  public initMap(): void {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
      document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
  }
}
