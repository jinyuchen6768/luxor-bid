import { NextRequest, NextResponse } from 'next/server';
import { bids } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const collectionId = req.nextUrl.searchParams.get('collectionId');
  const result = collectionId ? bids.filter(b => b.collectionId === collectionId) : bids;
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const newBid = await req.json();
  bids.push(newBid);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const updated = await req.json();
  const index = bids.findIndex(b => b.id === updated.id);
  if (index !== -1) bids[index] = updated;
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const index = bids.findIndex(b => b.id === id);
  if (index !== -1) bids.splice(index, 1);
  return NextResponse.json({ success: true });
}
