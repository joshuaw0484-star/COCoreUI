// Distributes .NET frost and 3-day forecast properties
// app/context/WeatherContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { api } from "../api/client";
import { useAuth } from "./AuthContext";

export interface FrostDates {
    firstFrostDate: string;
    lastFrostDate: string;
}

export interface WeatherDay {
    date: string;
    temperatureHigh: number;
    temperatureLow: number;
    precipitationChance: number;
    conditionSummary: string;
}

interface WeatherContextType {
    frostData: FrostDates | null;
    forecast: WeatherDay[] | null;
    isLoading: boolean;
    error: string | null;
    refetchWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { isAuthenticated } = useAuth();
    const [frostData, setFrostData] = useState<FrostDates | null>(null);
    const [forecast, setForecast] = useState<WeatherDay[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Parallel batch call to your secure .NET weather endpoints
            const [frostRes, forecastRes] = await Promise.all([
                api.get<FrostDates>("/weather/frost-dates"),
                api.get<WeatherDay[]>("/weather/outlook"),
            ]);

            setFrostData(frostRes.data);
            setForecast(forecastRes.data);
        } catch (err: any) {
            setError(
                err.message || "Failed to sync real-time weather analytics.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Only query weather details from the .NET backend if the user possesses an active session token
    useEffect(() => {
        if (isAuthenticated) {
            fetchWeatherData();
        } else {
            // Clear tracking state if user logs out
            setFrostData(null);
            setForecast(null);
        }
    }, [isAuthenticated]);

    return (
        <WeatherContext.Provider
            value={{
                frostData,
                forecast,
                isLoading,
                error,
                refetchWeather: fetchWeatherData,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = (): WeatherContextType => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error(
            "useWeather must be wrapped within a WeatherProvider structural layout tree.",
        );
    }
    return context;
};
