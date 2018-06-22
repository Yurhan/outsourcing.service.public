
export interface ILocation {
  lat: number;
  lng: number;
}

export interface IGeometry {
  location: ILocation;
}

export interface IGoogleMapRI {
  results: {
    geometry: IGeometry;
  }[];
  status: string;
}
