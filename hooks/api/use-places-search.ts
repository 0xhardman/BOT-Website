import useSWR from "swr";

interface SearchParams {
    textQuery: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
}

const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';
const API_KEY = 'AIzaSyCNyDfROC_Mx1V8592dYliAhJZvUwVBe6I';

const placesSearchFetcher = async (url: string, params: SearchParams) => {
    const { textQuery, latitude = 13.723789930496137, longitude = 100.55846291764392, radius = 1000 } = params;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': '*',
        },
        body: JSON.stringify({
            textQuery,
            locationBias: {
                circle: {
                    radius,
                    center: {
                        latitude,
                        longitude,
                    },
                }
            },
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }

    return response.json();
};

export function usePlacesSearch(params: SearchParams) {
    
    const { data, error, isLoading } = useSWR(
        params.textQuery ? [PLACES_API_URL, params] : null,
        ([url, params]) => placesSearchFetcher(url, params)
    );

    return {
        places: data?.places,
        error,
        isLoading,
    };
}