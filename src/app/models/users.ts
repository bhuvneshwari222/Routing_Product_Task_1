export interface Iuser {
  userName: string;
  userId: string;
  userRole: 'admin' | 'superAdmin' | 'candidate' | 'manager';
  profileDescription: string;
  profileImage: string;
  skills: string[];
  experienceYears: string;
  isActive: boolean;
  address: Address;
  isAddressSame: boolean;
}

export interface Address {
  current: AddressDetails;
  permanent: AddressDetails;
}

export interface AddressDetails {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface IuserResp<T>{
  msg: string,
  data: T
}