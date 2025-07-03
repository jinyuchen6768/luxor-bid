'use client';
import { useState } from 'react';
import { Bid } from '@/types';

type Props = {
  bid: Bid;
  isBidOwner: boolean;
  isCollectionOwner?: boolean;
  onAccept?: (bidId: string) => void;
  onEdit?: (bid: Bid) => void;
  onCancel?: (bidId: string) => void;
};

export default function BidCard({ bid, isBidOwner, onAccept, onEdit, onCancel,isCollectionOwner }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!confirm('Accept this bid?')) return;
    setLoading(true);
    try {
      await fetch('/api/bids/accept', {
        method: 'POST',
        body: JSON.stringify({ collectionId: bid.collectionId, bidId: bid.id })
      });
      onAccept?.(bid.id);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="card" style={{ marginTop: '0.5rem', background: '#f6f6f6' }}>
      <p>User: {bid.userId}</p>
      <p>Price: ${bid.price}</p>
      <p>Status: {bid.status}</p>

      {isCollectionOwner && bid.status === 'pending' && (
        <button onClick={handleAccept} disabled={loading}>Accept</button>
      )}

      {isBidOwner && bid.status === 'pending' && (
        <>
          <button onClick={() => onEdit?.(bid)}>Edit</button>
          <button onClick={() => onCancel?.(bid.id)}>Cancel</button>
        </>
      )}
    </div>
  );
}
