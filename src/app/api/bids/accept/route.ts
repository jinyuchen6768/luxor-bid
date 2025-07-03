import { NextResponse } from 'next/server';
import { bids } from '@/lib/mockData';

export async function POST(req: Request) {
  const { collectionId, bidId } = await req.json();
  for (const b of bids) {
    if (b.collectionId === collectionId) {
      b.status = b.id === bidId ? 'accepted' : 'rejected';
    }
  }
  return NextResponse.json({ success: true });
}
