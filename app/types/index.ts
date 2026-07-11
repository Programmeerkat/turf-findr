export type User = {
  id: number;
  name: string;
  email: string;
};

export type Room = {
  id: number;
  owner_id: number;
  country: string;
  city: string;
  street: string;
  title: string;
  description: string;
};