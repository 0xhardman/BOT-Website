import useSWR from 'swr';

interface TaxiTimeParams {
    origin: string;
    destination: string;
}

interface TaxiTimeResponse {
    distance: number;
    duration: number;
    durationInTraffic: number;
    origin: string;
    destination: string;
}

const fetcher = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch taxi time');
    }
    const data = await response.json() as TaxiTimeResponse;

    return data;
};

export function useTaxiTime(params: TaxiTimeParams) {
    const { data, error, isLoading } = useSWR(
        params.origin && params.destination ? `/api/time?origin=${params.origin}&destination=${params.destination}` : null,
        fetcher
    );

    return {
        data: data as TaxiTimeResponse,
        error,
        isLoading,
    };
} 