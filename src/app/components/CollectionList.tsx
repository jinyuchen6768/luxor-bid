'use client';

import { useEffect, useState } from 'react';
import { Collection } from '@/types';
import CollectionCard from './CollectionCard';
import BidList from './BidList';
import CollectionForm from './CollectionForm';
import Modal from './Modal';

export default function CollectionList() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const fetchCollections = async () => {
    const res = await fetch('/api/collections');
    const data = await res.json();
    const sorted = data.sort((a: Collection, b: Collection) =>
      (b.createdAt || 0) - (a.createdAt || 0)
    );
    setCollections(sorted);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreate = async (newCol: Collection) => {
    const colWithTime = { ...newCol, createdAt: Date.now() };
    await fetch('/api/collections', {
      method: 'POST',
      body: JSON.stringify(colWithTime),
    });
    setCollections(prev => [colWithTime, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = async (updated: Collection) => {
    await fetch('/api/collections', {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
    setCollections(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/collections', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  return (
    <div>
      <button onClick={() => setShowForm(true)} style={{ marginBottom: '1rem' }}>
        Create Collection
      </button>

      {collections.map(col => (
        <div key={col.id}>
          <CollectionCard
            data={col}
            onUpdate={col.ownerId === currentUserId ? handleUpdate : undefined}
            onDelete={col.ownerId === currentUserId ? handleDelete : undefined}
            isOwner={col.ownerId === currentUserId}
            currentUserId={currentUserId || ''}
          />
          <button
            onClick={() =>
              setExpanded(prev => ({ ...prev, [col.id]: !prev[col.id] }))
            }
            style={{ marginBottom: '0.5rem' }}
          >
            {expanded[col.id] ? 'Hide Bids' : 'Show Bids'}
          </button>
          {expanded[col.id] && (
            <BidList
              collectionId={col.id}
              isCollectionOwner={col.ownerId === currentUserId}
              currentUserId={currentUserId || ''}
            />
          )}
        </div>
      ))}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <CollectionForm onSubmit={handleCreate} currentUserId={currentUserId || ''}/>
      </Modal>
    </div>
  );
}
