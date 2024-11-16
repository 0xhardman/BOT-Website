import useSWR from "swr";

interface TaxiTimeParams {
  originPlaceId: string;
  destinationPlaceId: string;
}

const DISTANCE_MATRIX_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
const API_KEY = 'AIzaSyCNyDfROC_Mx1V8592dYliAhJZvUwVBe6I';

const taxiTimeFetcher = async (url: string, params: TaxiTimeParams) => {
  const { originPlaceId, destinationPlaceId } = params;
  
  const queryParams = new URLSearchParams({
    origins: `place_id:${originPlaceId}`,
    destinations: `place_id:${destinationPlaceId}`,
    departure_time: 'now',
    key: API_KEY,
    mode: 'driving',
    language: 'en-US',
  });

  const response = await fetch(`${url}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch taxi time');
  }

  const data = await response.json();
  
  if (data.status !== 'OK') {
    throw new Error(data.error_message || 'Failed to get taxi time');
  }

  const element = data.rows[0].elements[0];
  return {
    duration: element.duration.text,
    durationInTraffic: element.duration_in_traffic?.text || element.duration.text
  };
};

export function useTaxiTime(params: TaxiTimeParams) {
  const { data, error, isLoading } = useSWR(
    params.originPlaceId && params.destinationPlaceId 
      ? [DISTANCE_MATRIX_URL, params] 
      : null,
    ([url, params]) => taxiTimeFetcher(url, params)
  );

  return {
    duration: data?.duration,
    durationInTraffic: data?.durationInTraffic,
    error,
    isLoading,
  };
} 