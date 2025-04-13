# Google Maps Integration Guide

This guide explains how to use the Google Maps API in the MVT Warehousing project.

## Architecture

The Google Maps integration uses a Supabase Edge Function to securely proxy requests to the Google Maps API. This approach keeps your API key secure by storing it as a secret on the server side.

```
Client App → Supabase Edge Function → Google Maps API
```

## Components

1. **Edge Function**: `supabase/functions/google-maps/index.ts`
   - Handles requests to the Google Maps API
   - Securely stores the API key as an environment variable
   - Provides endpoints for geocoding, directions, and place details

2. **Client API**: `lib/google-maps-api.ts`
   - Provides TypeScript functions for interacting with the Edge Function
   - Handles authentication and error handling

3. **Example Component**: `components/google-maps-example.tsx`
   - Demonstrates how to use the Google Maps API in a React component
   - Provides UI for geocoding, directions, and place details

4. **Test Page**: `app/google-maps-test/page.tsx`
   - A page that renders the example component for testing

## Deployment

There are two ways to deploy the Edge Function:

### 1. Deploy via Supabase Dashboard (No Docker Required)

Follow the instructions in [deploy-edge-function-dashboard.md](./deploy-edge-function-dashboard.md) to deploy the Edge Function directly through the Supabase dashboard without Docker.

### 2. Deploy via Supabase CLI (Requires Docker)

If you have Docker installed, you can deploy the Edge Function using the Supabase CLI:

```bash
./scripts/deploy-google-maps-function.sh
```

## Client-Side Usage

### Geocoding

Convert an address to coordinates:

```typescript
import { geocodeAddress } from '@/lib/google-maps-api';

async function getCoordinates() {
  try {
    const result = await geocodeAddress('7167 Chino Dr, El Paso, TX 79915, USA');
    console.log(result.results[0].geometry.location);
    // { lat: 31.76074119999999, lng: -106.3789232 }
  } catch (error) {
    console.error('Error geocoding address:', error);
  }
}
```

### Directions

Get directions between two locations:

```typescript
import { getDirections } from '@/lib/google-maps-api';

async function getRoute() {
  try {
    const result = await getDirections(
      '7167 Chino Dr, El Paso, TX 79915, USA',
      '7180 Merchant Ave, El Paso, TX 79915, USA',
      'driving'
    );
    console.log(result.routes[0].legs[0].distance);
    // { text: "0.2 mi", value: 322 }
  } catch (error) {
    console.error('Error getting directions:', error);
  }
}
```

### Place Details

Get details about a place by its ID:

```typescript
import { getPlaceDetails } from '@/lib/google-maps-api';

async function getPlace() {
  try {
    const result = await getPlaceDetails('ChIJGaSe4RJb54YR-mUELakPc1s');
    console.log(result.result.name);
    // "7167 Chino Dr"
  } catch (error) {
    console.error('Error getting place details:', error);
  }
}
```

## Environment Variables

The Edge Function requires the following environment variables:

- `GOOGLE_MAPS_API_KEY`: Your Google Maps API key (set as a secret in the Supabase dashboard)

The client-side code requires the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key (for authentication)

## Troubleshooting

### CORS Errors

If you encounter CORS errors, make sure the CORS headers are properly set in the Edge Function. The Edge Function includes CORS headers by default, but you may need to adjust them if you're using a different domain.

### Authentication Errors

If you get authentication errors, make sure you're including the Supabase anon key in your requests. The client-side code is configured to use the anon key for authentication.

### API Key Errors

If you get "GOOGLE_MAPS_API_KEY is not set" errors, make sure you've added the secret in the Supabase dashboard.

## Scripts

- `scripts/dashboard-deploy-google-maps-function.js`: Generates code for dashboard deployment
- `scripts/deploy-google-maps-function.sh`: Deploys the Edge Function using the Supabase CLI
- `scripts/update-google-maps-client.js`: Updates the client-side code to use the anon key

## Resources

- [Google Maps API Documentation](https://developers.google.com/maps/documentation)
- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
