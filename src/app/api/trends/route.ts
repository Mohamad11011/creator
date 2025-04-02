import { NextResponse } from 'next/server';
import { getAllTrends } from '@/lib/services/trending-service';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const trends = await getAllTrends();
    return NextResponse.json(trends);
  } catch (error) {
    console.error('Error fetching trends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending topics' },
      { status: 500 }
    );
  }
} 