export interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  description: string;
  shipping: {
    name: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postal_code: string;
    };
  };
}
