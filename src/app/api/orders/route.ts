import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      orderType,
      occasion,
      size,
      flavor,
      dietary,
      designDescription,
      inscription,
      pickupDate,
      pickupTime,
      name,
      phone,
      email,
    } = body;

    // Validate required fields
    if (!orderType || !name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: orderType, name, phone, email' },
        { status: 400 }
      );
    }

    const order = await db.order.create({
      data: {
        orderType,
        occasion: occasion || null,
        size: size || null,
        flavor: flavor || null,
        dietary: dietary || null,
        designDescription: designDescription || null,
        inscription: inscription || null,
        pickupDate: pickupDate || null,
        pickupTime: pickupTime || null,
        name,
        phone,
        email,
        status: 'pending',
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
