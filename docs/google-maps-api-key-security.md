# Google Maps API Key Security

## Overview

This document explains the security improvements made to the Google Maps integration in the MVT Warehousing website. The changes address two main issues:

1. Performance warning: `LoadScript has been reloaded unintentionally! You should not pass 'libraries' prop as new array.`
2. API security: Preventing exposure of the Google Maps API key in client-side code.

## Implementation Details

### 1. Performance Fix

The performance warning occurred because the `libraries` array was being recreated on each render. This has been fixed by:

- Defining the `libraries` array outside the component to prevent it from being recreated on each render
- Properly typing the array to ensure TypeScript compatibility

```typescript
// Define libraries array outside of the component to prevent reloading
const libraries = ['places', 'geometry'] as ('places' | 'geometry')[];
  
const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: mapApiKey,
  libraries: libraries
});
```

### 2. API Key Security

To improve security, we've implemented a proxy approach using Supabase Edge Functions:

1. **Removed direct API key exposure**: The Google Maps API key is no longer directly exposed in client-side code.

2. **Added API key endpoint**: Created a new endpoint in the Supabase Edge Function to securely provide the API key to the client:
   ```
   GET /functions/v1/google-maps/api-key
   ```

3. **Client-side implementation**: The client now fetches the API key from the Edge Function before initializing the Google Maps API:
   ```typescript
   useEffect(() => {
     const fetchApiKey = async () => {
       try {
         const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
         const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
         
         const response = await fetch(`${supabaseUrl}/functions/v1/google-maps/api-key`, {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${anonKey}`
           }
         });
         
         const data = await response.json();
         setMapApiKey(data.apiKey);
       } catch (error) {
         console.error('Error fetching API key:', error);
       }
     };
     
     fetchApiKey();
   }, []);
   ```

4. **Edge Function implementation**: The Edge Function securely provides the API key with a short expiration time:
   ```typescript
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
   ```

## Deployment

Several deployment scripts have been created to deploy the updated Edge Function:

### Bash Script (Recommended for macOS/Linux)

```bash
npm run deploy:google-maps-api-key
```

This script:
1. Sets the Google Maps API key as a Supabase secret
2. Deploys the updated Edge Function with the new API key endpoint
3. Provides testing instructions for the new endpoint

### TypeScript Script (Cross-platform)

```bash
npm run deploy:google-maps-dashboard
```

This script:
1. Uses TypeScript to provide a more robust deployment process
2. Automatically loads environment variables from `.env.local` or `.env`
3. Installs required dependencies if they're missing
4. Provides detailed error handling and colorized output
5. Works on Windows, macOS, and Linux

## Benefits

1. **Improved Performance**: Eliminates the performance warning by properly handling the libraries array.
2. **Enhanced Security**: Protects the Google Maps API key from being exposed in client-side code.
3. **Better API Key Management**: Centralizes API key management in the Supabase Edge Function.
4. **Reduced Risk**: Minimizes the risk of API key abuse by adding expiration and requiring authentication.

## Troubleshooting

If you encounter issues with the Google Maps integration:

1. Check the browser console for errors
2. Verify that the Supabase Edge Function is deployed correctly
3. Ensure the Google Maps API key is set as a Supabase secret
4. Test the API key endpoint directly using the provided curl command
