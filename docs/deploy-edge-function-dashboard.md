# Deploying Google Maps Edge Function via Supabase Dashboard

This guide explains how to deploy the Google Maps Edge Function directly through the Supabase dashboard without using Docker.

## Prerequisites

- A Supabase account and project
- Your Google Maps API key (already in `.env.local`)

## Step 1: Prepare the Edge Function Code

The Edge Function code should be prepared by combining the necessary files into a single file that can be deployed through the dashboard. The code should include the main function logic and CORS headers.

**Note:** The script that previously generated this code has been removed as it's no longer needed after successful deployment.

## Step 2: Deploy via Supabase Dashboard

1. Go to your [Supabase dashboard](https://supabase.com/dashboard)
2. Navigate to your project
3. Go to the "Edge Functions" section in the left sidebar
4. Click "Deploy a new function" > "Via Editor"
5. Name your function `google-maps`
6. Copy and paste the Edge Function code into the editor
7. Click "Deploy function"

## Step 3: Add the Google Maps API Key Secret

After deployment, you need to add your Google Maps API key as a secret:

1. Go to the "Edge Functions" section in your Supabase dashboard
2. Click on the `google-maps` function
3. Go to the "Secrets" tab
4. Click "Add Secret"
5. Enter the following:
   - Key: `GOOGLE_MAPS_API_KEY`
   - Value: [Your API key from `.env.local` file]
6. Click "Save"

## Step 4: Test the Edge Function

You can test the Edge Function directly from the Supabase dashboard:

1. Go to the "Edge Functions" section
2. Click on the `google-maps` function
3. Go to the "Test" tab
4. Set the HTTP method to "POST"
5. Add the following headers:
   - `Content-Type`: `application/json`
6. Set the endpoint to `/geocode`
7. Add a request body:
   ```json
   {
     "address": "7167 Chino Dr, El Paso, TX 79915, USA"
   }
   ```
8. Click "Run"

You should see a successful response with geocoding data.

## Step 5: Update the Client Code

The client code in `lib/google-maps-api.ts` should already be configured to use the Edge Function. If not, make sure it's pointing to your Supabase project URL:

```typescript
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/google-maps`;
```

## Troubleshooting

- If you get a CORS error, make sure the CORS headers are properly set in the Edge Function.
- If you get an authentication error, make sure you're including the Supabase anon key in your requests.
- If you get a "GOOGLE_MAPS_API_KEY is not set" error, make sure you've added the secret in the Supabase dashboard.
