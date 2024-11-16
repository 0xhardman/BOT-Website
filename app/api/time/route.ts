import { NextResponse } from 'next/server';
import axios from 'axios';

const DISTANCE_MATRIX_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    try {
        const response = await axios({
            url: DISTANCE_MATRIX_URL,
            params: {
                origins: `${origin}`,
                destinations: `${destination}`,
                departure_time: 'now',
                key: API_KEY,
                mode: 'driving',
                language: 'en-US',
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch taxi time' },
            { status: 500 }
        );
    }
} 