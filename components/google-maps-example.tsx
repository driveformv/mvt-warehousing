'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { geocodeAddress, getDirections, getPlaceDetails } from '@/lib/google-maps-api';

export default function GoogleMapsExample() {
  const [address, setAddress] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supabaseStatus, setSupabaseStatus] = useState<'loading' | 'configured' | 'error'>('loading');
  const [apiKeyStatus, setApiKeyStatus] = useState<'loading' | 'available' | 'error'>('loading');
  const [configChecked, setConfigChecked] = useState(false);

  // Check if Supabase is configured on component mount
  useEffect(() => {
    const checkConfigurations = async () => {
      if (configChecked) return; // Only check once
      
      try {
        // Check Supabase configuration
        const { isSupabaseConfigured } = await import('@/lib/supabase');
        if (isSupabaseConfigured()) {
          setSupabaseStatus('configured');
          setApiKeyStatus('available'); // We'll fetch the API key from Supabase Edge Function
        } else {
          setSupabaseStatus('error');
          setApiKeyStatus('error');
          setError('SUPABASE_URL or SUPABASE_ANON_KEY is not defined');
        }
        
        setConfigChecked(true);
      } catch (err) {
        setSupabaseStatus('error');
        setApiKeyStatus('error');
        setError('Failed to check configurations');
        console.error('Error checking configurations:', err);
        setConfigChecked(true);
      }
    };

    checkConfigurations();
  }, [configChecked]);

  const handleGeocode = async () => {
    if (!address) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await geocodeAddress(address);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDirections = async () => {
    if (!origin || !destination) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getDirections(origin, destination);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetPlaceDetails = async () => {
    if (!placeId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getPlaceDetails(placeId);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">Google Maps API Examples</h1>
      <p className="text-gray-500">
        These examples demonstrate how to use the Google Maps API through Supabase Edge Functions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Geocoding Card */}
        <Card>
          <CardHeader>
            <CardTitle>Geocoding</CardTitle>
            <CardDescription>Convert an address to coordinates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter an address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGeocode} disabled={loading || !address}>
              {loading ? 'Loading...' : 'Geocode Address'}
            </Button>
          </CardFooter>
        </Card>

        {/* Directions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Directions</CardTitle>
            <CardDescription>Get directions between two locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  placeholder="Starting point"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Ending point"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGetDirections} disabled={loading || !origin || !destination}>
              {loading ? 'Loading...' : 'Get Directions'}
            </Button>
          </CardFooter>
        </Card>

        {/* Place Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Place Details</CardTitle>
            <CardDescription>Get details about a place by ID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="placeId">Place ID</Label>
                <Input
                  id="placeId"
                  placeholder="Google Maps Place ID"
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGetPlaceDetails} disabled={loading || !placeId}>
              {loading ? 'Loading...' : 'Get Place Details'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Results Section */}
      {(result || error) && (
        <Card>
          <CardHeader>
            <CardTitle>{error ? 'Error' : 'Results'}</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
