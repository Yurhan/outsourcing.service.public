export interface IAddress {
  city?: string;
  street?: string;
}

export interface IContact {
  id: number;
  address?: IAddress;
  primaryPhone: string;
  mobPhones: string[];
}
