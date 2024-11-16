import useSWR from "swr";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface SearchParams {
    textQuery: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
}

const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

const placesSearchFetcher = async (url: string, params: SearchParams) => {
    const { textQuery, latitude, longitude, radius = 10 } = params;
    console.log(textQuery, latitude, longitude)
    console.log({ API_KEY })
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

interface Place {
    name: string;
    id: string;
    types: string[];
    formattedAddress: string;
    addressComponents: AddressComponent[];
    plusCode: PlusCode;
    location: Location;
    viewport: Viewport;
    googleMapsUri: string;
    websiteUri?: string;
    regularOpeningHours: OpeningHours;
    utcOffsetMinutes: number;
    adrFormatAddress: string;
    businessStatus: string;
    iconMaskBaseUri: string;
    iconBackgroundColor: string;
    displayName: DisplayName;
    currentOpeningHours: CurrentOpeningHours;
    shortFormattedAddress: string;
    photos?: Photo[];
    containingPlaces?: ContainingPlace[];
    addressDescriptor: AddressDescriptor;
    googleMapsLinks: GoogleMapsLinks;
}

interface AddressComponent {
    longText: string;
    shortText: string;
    types: string[];
    languageCode: string;
}

interface PlusCode {
    globalCode: string;
    compoundCode: string;
}

interface Location {
    latitude: number;
    longitude: number;
}

interface Viewport {
    low: Location;
    high: Location;
}

interface OpeningHours {
    openNow: boolean;
    periods: Period[];
    weekdayDescriptions: string[];
    nextOpenTime: string;
}

interface Period {
    open: TimeSlot;
    close: TimeSlot;
}

interface TimeSlot {
    day: number;
    hour: number;
    minute: number;
    date?: DateInfo;
    truncated?: boolean;
}

interface DateInfo {
    year: number;
    month: number;
    day: number;
}

interface DisplayName {
    text: string;
    languageCode: string;
}

interface CurrentOpeningHours extends OpeningHours {
    periods: CurrentPeriod[];
}

interface CurrentPeriod extends Period {
    open: TimeSlot;
    close: TimeSlot;
}

interface Photo {
    name: string;
    widthPx: number;
    heightPx: number;
    authorAttributions: AuthorAttribution[];
    flagContentUri: string;
    googleMapsUri: string;
}

interface AuthorAttribution {
    displayName: string;
    uri: string;
    photoUri: string;
}

interface ContainingPlace {
    name: string;
    id: string;
}

interface AddressDescriptor {
    landmarks: Landmark[];
    areas: Area[];
}

interface Landmark {
    name: string;
    placeId: string;
    displayName: DisplayName;
    types: string[];
    spatialRelationship?: string;
    straightLineDistanceMeters: number;
    travelDistanceMeters: number;
}

interface Area {
    name: string;
    placeId: string;
    displayName: DisplayName;
    containment: string;
}

interface GoogleMapsLinks {
    directionsUri: string;
    placeUri: string;
    writeAReviewUri: string;
    reviewsUri: string;
    photosUri: string;
}

export function usePlacesSearch(params: SearchParams) {
    const [debouncedParams, setDebouncedParams] = useState(params);

    useEffect(() => {
        const debouncedUpdate = debounce((newParams: SearchParams) => {
            setDebouncedParams(newParams);
        }, 500);

        debouncedUpdate(params);

        return () => {
            debouncedUpdate.cancel();
        };
    }, [params]);

    const { data, error, isLoading } = useSWR(
        debouncedParams.textQuery ? [PLACES_API_URL, debouncedParams] : null,
        ([url, params]) => placesSearchFetcher(url, params)
    );

    return {
        places: data?.places as Place[],
        error,
        isLoading,
    };
}