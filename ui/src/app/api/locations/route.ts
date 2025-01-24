import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../utils/mongodb';

export async function GET() {
    const { db } = await connectToDatabase();
  
    try {
      const washrooms = await db
        .collection('WashroomLocations')
        .find({})
        .toArray();
  
      const waterFountains = await db
        .collection('WaterFountainLocations')
        .find({})
        .toArray();
  
      return NextResponse.json({ washrooms, waterFountains });
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
  }