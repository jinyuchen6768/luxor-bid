'use client';
import { useState } from 'react';
import { Collection } from '@/types';

type Props = {
  defaultValue?: Collection;
  onSubmit: (data: Collection) => void;
  currentUserId: string;
};

export default function CollectionForm({ defaultValue, onSubmit,currentUserId }: Props) {
  const [name, setName] = useState(defaultValue?.name || '');
  const [description, setDesc] = useState(defaultValue?.description || '');
  const [price, setPrice] = useState(defaultValue?.price || '');
  const [stocks, setStocks] = useState(defaultValue?.stocks || '');

  const handleSubmit = () => {
    const collection: Collection = {
      id: defaultValue?.id || `c-${Date.now()}`,
      name,
      description,
      price: Number(price),
      stocks: Number(stocks),
      ownerId: defaultValue?.ownerId || currentUserId
    };
    onSubmit(collection);
  };

  return (
    <div className="card card-form ">
      <h3>{defaultValue ? 'Edit' : 'Create'} Collection</h3>
      <label className='label'>Name:</label>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <label className='label'>Description:</label>
      <input value={description} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <label className='label'>Price:</label>
      <input value={price} onChange={e => setPrice(e.target.value)} type="text" placeholder="Price" />
      <label className='label'>Stocks:</label>
      <input value={stocks} onChange={e => setStocks(e.target.value)} type="text" placeholder="Stocks" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
