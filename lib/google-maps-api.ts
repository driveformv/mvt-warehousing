/**
 * Client-side utility for interacting with the Google Maps API via Supabase Edge Functions
 */

import { supabase, getSupabaseUrl, getSupabaseAnonKey } from './supabase';

// Types for the Google Maps API requests
interface GeocodingRequest {
  address: string;
}

interface DirectionsRequest {
  origin: string;
  destination: string;
  mode?: 'driving' | 'walking' | 'bicycling' | 'transit';
}

interface PlaceDetailsRequest {
  placeId: string;
}

/**
 * Get the base URL for the Supabase Edge Function
 * @returns The base URL for the Supabase Edge Function
 */
const getEdgeFunctionUrl = () => {
  const supabaseUrl = getSupabaseUrl();
  if (!supabaseUrl) {
    throw new Error('SUPABASE_URL is not defined');
  }
  return `${supabaseUrl}/functions/v1/google-maps`;
};

/**
 * Get the authorization header for the Supabase Edge Function
 * @returns The authorization header for the Supabase Edge Function
 */
const getAuthHeader = async (): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  // Use the anon key for authentication since the Edge Function is deployed with --no-verify-jwt
  const anonKey = getSupabaseAnonKey();
  if (anonKey) {
    return {
      ...headers,
      'Authorization': `Bearer ${anonKey}`
    };
  }
  
  // Fall back to session token if available
  if (supabase?.auth) {
    try {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.access_token) {
        return {
          ...headers,
          'Authorization': `Bearer ${data.session.access_token}`
        };
      }
    } catch (e) {
      console.warn('Failed to get auth session:', e);
    }
  }
  
  console.error('No authorization method available for Supabase Edge Function');
  return headers;
};

/**
 * Geocode an address to get its coordinates
 * @param address The address to geocode
 * @returns The geocoding response from Google Maps API
 */
export async function geocodeAddress(address: string) {
  try {
    const authHeader = await getAuthHeader();
    const edgeFunctionUrl = getEdgeFunctionUrl();
    
    console.log(`Geocoding address: ${address}`);
    
    const response = await fetch(`${edgeFunctionUrl}/geocode`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ address } as GeocodingRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Geocoding failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Geocoding successful');
    return data;
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}

/**
 * Get directions between two locations
 * @param origin The starting location (address or coordinates)
 * @param destination The ending location (address or coordinates)
 * @param mode The travel mode (driving, walking, bicycling, transit)
 * @returns The directions response from Google Maps API
 */
export async function getDirections(
  origin: string,
  destination: string,
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
) {
  try {
    const authHeader = await getAuthHeader();
    const edgeFunctionUrl = getEdgeFunctionUrl();
    
    console.log(`Getting directions from ${origin} to ${destination} via ${mode}`);
    
    const response = await fetch(`${edgeFunctionUrl}/directions`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ origin, destination, mode } as DirectionsRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Getting directions failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Directions retrieved successfully');
    return data;
  } catch (error) {
    console.error('Error getting directions:', error);
    throw error;
  }
}

/**
 * Get details for a place by its place ID
 * @param placeId The Google Maps place ID
 * @returns The place details response from Google Maps API
 */
export async function getPlaceDetails(placeId: string) {
  try {
    const authHeader = await getAuthHeader();
    const edgeFunctionUrl = getEdgeFunctionUrl();
    
    console.log(`Getting place details for place ID: ${placeId}`);
    
    const response = await fetch(`${edgeFunctionUrl}/place-details`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({ placeId } as PlaceDetailsRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Getting place details failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Place details retrieved successfully');
    return data;
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
}
