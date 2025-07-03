'use client';
import { useEffect, useState } from 'react';
import { Bid } from '@/types';
import BidCard from './BidCard';
import Modal from './Modal';
import BidForm from './BidForm';

type Props = {
  collectionId: string;
  currentUserId: string;
  isCollectionOwner?: boolean;
};

export default function BidList({ collectionId, currentUserId ,isCollectionOwner}: Props) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editBid, setEditBid] = useState<Bid | null>(null);

  const fetchBids = async () => {
    const res = await fetch(`/api/bids?collectionId=${collectionId}`);
    const data = await res.json();
    setBids(data);
  };

  useEffect(() => { fetchBids(); }, [collectionId]);

  const handleSubmit = async (data: Bid) => {
    const method = editBid ? 'PUT' : 'POST';
    await fetch('/api/bids', {
      method,
      body: JSON.stringify(data)
    });
    setShowForm(false);
    setEditBid(null);
    fetchBids();
  };

  const handleCancel = async (id: string) => {
    await fetch('/api/bids', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    });
    fetchBids();
  };

  const handleAccept = () => fetchBids();

  return (
    <div style={{ paddingLeft: '1rem' }}>
      <h4>Bids:</h4>
      {bids.map(bid => (
        <BidCard
          key={bid.id}
          bid={bid} 
          isBidOwner={bid.userId === currentUserId}
          isCollectionOwner={isCollectionOwner}
          onAccept={handleAccept}
          onEdit={b => { setEditBid(b); setShowForm(true); }}
          onCancel={handleCancel}
        />
      ))}

      {!isCollectionOwner && (
        <button onClick={() => setShowForm(true)} style={{ marginTop: '0.5rem' }}>Place Bid</button>
      )}

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditBid(null); }}>
        <BidForm collectionId={collectionId} defaultValue={editBid || undefined} onSubmit={handleSubmit} currentUserId={currentUserId}/>
      </Modal>
    </div>
  );
}
