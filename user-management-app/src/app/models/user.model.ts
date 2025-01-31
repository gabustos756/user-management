export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}
