export interface IAddress {
  city: string;
  street: string;
}

export interface IContact {
  address: IAddress;
  primaryPhone: string;
  mobPhones: string[];
}
