'use client';
import { useState } from 'react';
import { Bid } from '@/types';

type Props = {
  collectionId: string;
  defaultValue?: Bid;
  onSubmit: (data: Bid) => void;
  currentUserId: string
};

export default function BidForm({ collectionId, defaultValue, onSubmit,currentUserId }: Props) {
  const [price, setPrice] = useState(defaultValue?.price || 0);

  const handleSubmit = () => {
    const bid: Bid = {
      id: defaultValue?.id || `b-${Date.now()}`,
      collectionId,
      price,
      userId: defaultValue?.userId || currentUserId,
      status: defaultValue?.status || 'pending'
    };
    onSubmit(bid);
  };

  return (
    <div className="card">
      <h3>{defaultValue ? 'Edit' : 'Place'} Bid</h3>
      <input value={price} onChange={e => setPrice(+e.target.value)} type="number" placeholder="Price" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
