/**
 * Client-side utility for interacting with the Google Maps API via Supabase Edge Functions
 */

import { supabase } from './supabase';

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

// Base URL for the Supabase Edge Function
const getEdgeFunctionUrl = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  return `${supabaseUrl}/functions/v1/google-maps`;
};

/**
 * Geocode an address to get its coordinates
 * @param address The address to geocode
 * @returns The geocoding response from Google Maps API
 */
export async function geocodeAddress(address: string) {
  try {
    // Get the session asynchronously if available
    let authHeader = {};
    // Use the anon key for authentication since the Edge Function is deployed with --no-verify-jwt
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (anonKey) {
      authHeader = { Authorization: `Bearer ${anonKey}` };
    } else {
      // Fall back to session token if available
      if (supabase?.auth) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.access_token) {
            authHeader = { Authorization: `Bearer ${data.session.access_token}` };
          }
        } catch (e) {
          console.warn('Failed to get auth session:', e);
        }
      }
    }

    const response = await fetch(`${getEdgeFunctionUrl()}/geocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify({ address } as GeocodingRequest),
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }

    return await response.json();
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
    // Get the session asynchronously if available
    let authHeader = {};
    // Use the anon key for authentication since the Edge Function is deployed with --no-verify-jwt
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (anonKey) {
      authHeader = { Authorization: `Bearer ${anonKey}` };
    } else {
      // Fall back to session token if available
      if (supabase?.auth) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.access_token) {
            authHeader = { Authorization: `Bearer ${data.session.access_token}` };
          }
        } catch (e) {
          console.warn('Failed to get auth session:', e);
        }
      }
    }

    const response = await fetch(`${getEdgeFunctionUrl()}/directions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify({ origin, destination, mode } as DirectionsRequest),
    });

    if (!response.ok) {
      throw new Error(`Getting directions failed: ${response.statusText}`);
    }

    return await response.json();
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
    // Get the session asynchronously if available
    let authHeader = {};
    // Use the anon key for authentication since the Edge Function is deployed with --no-verify-jwt
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (anonKey) {
      authHeader = { Authorization: `Bearer ${anonKey}` };
    } else {
      // Fall back to session token if available
      if (supabase?.auth) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.access_token) {
            authHeader = { Authorization: `Bearer ${data.session.access_token}` };
          }
        } catch (e) {
          console.warn('Failed to get auth session:', e);
        }
      }
    }

    const response = await fetch(`${getEdgeFunctionUrl()}/place-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify({ placeId } as PlaceDetailsRequest),
    });

    if (!response.ok) {
      throw new Error(`Getting place details failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
}
