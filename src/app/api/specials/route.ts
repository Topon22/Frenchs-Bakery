import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const specials = await db.dailySpecial.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json({ specials });
  } catch (error) {
    console.error('Specials fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specials' },
      { status: 500 }
    );
  }
}
