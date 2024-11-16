import axios from 'axios';
import { useState, useEffect } from 'react';

interface TaxiTimeParams {
    origin: string
    destination: string;
}

const DISTANCE_MATRIX_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const taxiTimeFetcher = async (params: TaxiTimeParams) => {
    const { origin, destination } = params;

    try {
        const response = await axios.get('/api/time', {
            params: {
                origin,
                destination
            }
        });

        const data = response.data;
        if (data.status !== 'OK') {
            throw new Error(data.error_message || 'Failed to get taxi time');
        }

        const element = data.rows[0].elements[0];
        return {
            duration: element.duration.text,
            durationInTraffic: element.duration_in_traffic?.text || element.duration.text
        };
    } catch (error) {
        throw new Error('Failed to fetch taxi time');
    }
};

export function useTaxiTime(params: TaxiTimeParams) {
    const [data, setData] = useState<{ duration: string; durationInTraffic: string } | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!params.origin || !params.destination) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const result = await taxiTimeFetcher(params);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.origin, params.destination]);

    return {
        duration: data?.duration,
        durationInTraffic: data?.durationInTraffic,
        error,
        isLoading,
    };
} 