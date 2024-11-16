import { useState, useEffect, useCallback } from 'react';

interface Location {
    latitude: number;
    longitude: number;
}

interface UseCurrentLocationReturn {
    location: Location | null;
    error: string | null;
    isLoading: boolean;
    retry: () => void;
}

interface UseCurrentLocationOptions {
    watch?: boolean;
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
    retryCount?: number;
}

export function useCurrentLocation(options: UseCurrentLocationOptions = {}): UseCurrentLocationReturn {
    const {
        watch = false,
        enableHighAccuracy = true,
        timeout = 30000,
        maximumAge = 10000,
        retryCount = 3,
    } = options;

    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [attempts, setAttempts] = useState(0);

    const getLocation = useCallback(() => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsLoading(false);
            return;
        }

        const cachedPosition = localStorage.getItem('lastKnownPosition');
        if (cachedPosition) {
            const parsed = JSON.parse(cachedPosition);
            const cacheAge = Date.now() - parsed.timestamp;
            if (cacheAge < maximumAge) {
                setLocation({
                    latitude: parsed.latitude,
                    longitude: parsed.longitude,
                });
                setIsLoading(false);
                return;
            }
        }

        const handleSuccess = (position: GeolocationPosition) => {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            
            localStorage.setItem('lastKnownPosition', JSON.stringify({
                ...newLocation,
                timestamp: Date.now()
            }));

            setLocation(newLocation);
            setIsLoading(false);
            setAttempts(0);
        };

        const handleError = (error: GeolocationPositionError) => {
            console.log('Geolocation error:', error);
            
            if (attempts < retryCount) {
                setAttempts(prev => prev + 1);
                setTimeout(getLocation, 1000);
                return;
            }

            let errorMessage = 'Failed to get location';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Please allow location access in your browser settings';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable. Please check your device settings';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out. Please try again';
                    break;
            }
            setError(errorMessage);
            setIsLoading(false);
        };

        const geoOptions: PositionOptions = {
            enableHighAccuracy,
            timeout,
            maximumAge,
        };

        if (watch) {
            const watcher = navigator.geolocation.watchPosition(
                handleSuccess,
                handleError,
                geoOptions
            );
            return () => navigator.geolocation.clearWatch(watcher);
        } else {
            navigator.geolocation.getCurrentPosition(
                handleSuccess,
                handleError,
                geoOptions
            );
        }
    }, [watch, enableHighAccuracy, timeout, maximumAge, retryCount, attempts]);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    const retry = useCallback(() => {
        setAttempts(0);
        getLocation();
    }, [getLocation]);

    return { location, error, isLoading, retry };
} 