import { Collection, Bid, User } from '@/types';

export const users: User[] = [];
for (let i = 1; i <= 10; i++) {
  users.push({
    id: `u${i}`,
    name: `User ${i}`,
    email: `user${i}@test.com`
  });
}

export const collections: Collection[] = [];
for (let i = 1; i <= 100; i++) {
  collections.push({
    id: `c${i}`,
    name: `Collection ${i}`,
    description: `Description for collection ${i}`,
    stocks: Math.floor(Math.random() * 100) + 1,
    price: Math.floor(Math.random() * 500) + 50,
    ownerId: users[i % users.length].id,
    createdAt: Date.now() - Math.floor(Math.random() * 10000000)
  });
}

export const bids: Bid[] = [];
collections.forEach((col, index) => {
  for (let j = 1; j <= 10; j++) {
    const userIndex = (index + j) % users.length;
    bids.push({
      id: `b-${col.id}-${j}`,
      collectionId: col.id,
      userId: users[userIndex].id,
      price: col.price + Math.floor(Math.random() * 100),
      status: 'pending',
      createdAt: Date.now() - Math.floor(Math.random() * 100000)
    });
  }
});
