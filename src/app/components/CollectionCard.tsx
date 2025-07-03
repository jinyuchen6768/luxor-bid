'use client';
import { useState } from 'react';
import { Collection } from '@/types';
import CollectionForm from './CollectionForm';
import Modal from './Modal';

type Props = {
  data: Collection;
  onDelete?: (id: string) => void;
  onUpdate?: (updated: Collection) => void;
  isOwner?: boolean;
  currentUserId: string;
};

export default function CollectionCard({ data, onDelete, onUpdate ,isOwner,currentUserId}: Props) {
  const [showEdit, setShowEdit] = useState(false);

  const handleUpdate = (updated: Collection) => {
    onUpdate?.(updated);
    setShowEdit(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this collection?')) {
      onDelete?.(data.id);
    }
  };

  return (
    <div className="card">
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <p>Price: ${data.price}</p>
      <p>Stocks: {data.stocks}</p>
      <div style={{ marginTop: '0.5rem' }}>
        {isOwner && <button onClick={() => setShowEdit(true)}>Edit</button>}
        {isOwner && <button onClick={handleDelete}>Delete</button>}
      </div>

      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)}>
        <CollectionForm defaultValue={data} onSubmit={handleUpdate} currentUserId ={currentUserId}/>
      </Modal>
    </div>
  );
}
