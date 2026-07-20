export type User = {
  id: number;
  name: string;
};

export type Room = {
  id: number;
  owner_id: number;
  country: string;
  city: string;
  street: string;
  title: string;
  description: string;
  img_src: string;
  price: number;
};

export type Review = {
  stars: number;
  fromId: string;
  text: string;
  date: string;
};
