export type User = {
  id: string;
  name: string;
  email: string;
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  stocks: number;
  price: number;
  ownerId: string;
  createdAt?: number;
};

export type Bid = {
  id: string;
  collectionId: string;
  price: number;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: number;
};
