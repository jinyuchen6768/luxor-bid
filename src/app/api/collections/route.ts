import { NextResponse } from 'next/server';
import { collections } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(collections);
}

export async function POST(req: Request) {
  const newItem = await req.json();
  collections.push(newItem);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const updated = await req.json();
  const index = collections.findIndex(c => c.id === updated.id);
  if (index !== -1) collections[index] = updated;
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const index = collections.findIndex(c => c.id === id);
  if (index !== -1) collections.splice(index, 1);
  return NextResponse.json({ success: true });
}
