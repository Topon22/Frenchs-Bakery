import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const flavors = await db.flavor.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
    return NextResponse.json({ flavors });
  } catch (error) {
    console.error('Flavors fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flavors' },
      { status: 500 }
    );
  }
}
