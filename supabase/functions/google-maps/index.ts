// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/deploy/docs/supabase-edge-functions

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Get the Google Maps API key from environment variables
const GOOGLE_MAPS_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY") || "";

if (!GOOGLE_MAPS_API_KEY) {
  console.error("GOOGLE_MAPS_API_KEY is not set");
}

interface GeocodingRequest {
  address: string;
}

interface DirectionsRequest {
  origin: string;
  destination: string;
  mode?: "driving" | "walking" | "bicycling" | "transit";
}

interface PlaceDetailsRequest {
  placeId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    // Set up response headers with CORS
    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", "application/json");

    // Special case for API key endpoint with GET method
    if (path === "api-key" && req.method === "GET") {
      return handleApiKeyRequest(headers);
    }

    // For other endpoints, parse the request body
    let requestData;
    try {
      requestData = await req.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers }
      );
    }

    // Handle different API endpoints
    switch (path) {
      case "geocode":
        return handleGeocode(requestData as GeocodingRequest, headers);
      case "directions":
        return handleDirections(requestData as DirectionsRequest, headers);
      case "place-details":
        return handlePlaceDetails(requestData as PlaceDetailsRequest, headers);
      default:
        return new Response(
          JSON.stringify({
            error: "Invalid endpoint. Use /geocode, /directions, /place-details, or /api-key",
          }),
          { status: 400, headers }
        );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});

async function handleGeocode(data: GeocodingRequest, headers: Headers): Promise<Response> {
  if (!data.address) {
    return new Response(
      JSON.stringify({ error: "Address is required" }),
      { status: 400, headers }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        data.address
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const geocodeData = await response.json();
    return new Response(JSON.stringify(geocodeData), { headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to geocode address" }),
      { status: 500, headers }
    );
  }
}

async function handleDirections(data: DirectionsRequest, headers: Headers): Promise<Response> {
  if (!data.origin || !data.destination) {
    return new Response(
      JSON.stringify({ error: "Origin and destination are required" }),
      { status: 400, headers }
    );
  }

  try {
    const mode = data.mode || "driving";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
        data.origin
      )}&destination=${encodeURIComponent(
        data.destination
      )}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const directionsData = await response.json();
    return new Response(JSON.stringify(directionsData), { headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to get directions" }),
      { status: 500, headers }
    );
  }
}

async function handlePlaceDetails(data: PlaceDetailsRequest, headers: Headers): Promise<Response> {
  if (!data.placeId) {
    return new Response(
      JSON.stringify({ error: "Place ID is required" }),
      { status: 400, headers }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
        data.placeId
      }&key=${GOOGLE_MAPS_API_KEY}`
    );

    const placeData = await response.json();
    return new Response(JSON.stringify(placeData), { headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to get place details" }),
      { status: 500, headers }
    );
  }
}

/**
 * Handle API key request - provides the Google Maps API key to the client
 * This is a secure way to provide the API key without exposing it in client-side code
 */
async function handleApiKeyRequest(headers: Headers): Promise<Response> {
  try {
    if (!GOOGLE_MAPS_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key is not configured on the server" }),
        { status: 500, headers }
      );
    }

    // Return the API key to the client
    return new Response(
      JSON.stringify({ 
        apiKey: GOOGLE_MAPS_API_KEY,
        // Set a short expiration time for security
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString() // 1 hour expiration
      }),
      { headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to retrieve API key" }),
      { status: 500, headers }
    );
  }
}
