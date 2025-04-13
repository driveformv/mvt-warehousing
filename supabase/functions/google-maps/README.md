# Google Maps Edge Function

This Edge Function provides a secure way to access the Google Maps API from the client-side without exposing your API key.

## Features

- **Geocoding**: Convert addresses to coordinates
- **Directions**: Get directions between two locations
- **Place Details**: Get details about a place by its ID

## Deployment Options

### Option 1: Deploy via Supabase Dashboard (No Docker Required)

Follow the instructions in the [deploy-edge-function-dashboard.md](../../../docs/deploy-edge-function-dashboard.md) guide to deploy the Edge Function directly through the Supabase dashboard without Docker.

### Option 2: Deploy via Supabase CLI (Requires Docker)

If you have Docker installed, you can deploy the Edge Function using the Supabase CLI:

```bash
./scripts/deploy-google-maps-function.sh
```

## Client-Side Usage

The client-side code is already set up to use the Edge Function. See [lib/google-maps-api.ts](../../../lib/google-maps-api.ts) for the implementation.

Example usage:

```typescript
import { geocodeAddress } from '@/lib/google-maps-api';

// Geocode an address
const result = await geocodeAddress('1600 Amphitheatre Parkway, Mountain View, CA');
console.log(result);
```

## Testing

You can test the Edge Function using the [Google Maps Example](../../../components/google-maps-example.tsx) component, which is available at the `/google-maps-test` route.

## Environment Variables

The Edge Function requires the following environment variables:

- `GOOGLE_MAPS_API_KEY`: Your Google Maps API key (set as a secret in the Supabase dashboard)

The client-side code requires the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key (for authentication)
