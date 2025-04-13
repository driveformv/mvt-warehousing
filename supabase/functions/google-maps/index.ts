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

    // Parse the request body
    const requestData = await req.json();

    // Set up response headers with CORS
    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", "application/json");

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
            error: "Invalid endpoint. Use /geocode, /directions, or /place-details",
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
