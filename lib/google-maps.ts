/**
 * Google Maps utility functions and configuration
 */

// Export the Google Maps API key from environment variables
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Default map center coordinates (centered between all facilities in TX and NM)
export const DEFAULT_MAP_CENTER = {
  lat: 30.0000, // Centered between El Paso and Laredo
  lng: -103.5000 // Centered to show both Texas and New Mexico facilities
};

// Default map zoom level (lower number = more zoomed out)
export const DEFAULT_ZOOM_LEVEL = 6; // Zoomed out to show TX and NM

// Default map container style
export const DEFAULT_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

// Custom map styles with a blue theme and emphasized US-Mexico border
export const BLUE_MAP_STYLE = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e9f5f8"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0c4b6a"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "weight": 3
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#1e5d83"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c5e3f2"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0c4b6a"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#b0d8ea"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0c4b6a"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0c4b6a"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#97cde4"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0c4b6a"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0c4b6a"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#97cde4"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#97cde4"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#444444"
      },
      {
        "weight": 2
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#444444"
      },
      {
        "weight": 1.5
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "weight": 1.5
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#6aadca"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0c4b6a"
      }
    ]
  }
];

// Location coordinates for all facilities - precise coordinates from Google Maps API
export const FACILITY_LOCATIONS = [
  {
    name: 'El Paso - Chino (Headquarters)',
    position: { lat: 31.76074119999999, lng: -106.3789232 },
    address: '7167 Chino Dr, El Paso, TX 79915, USA'
  },
  {
    name: 'El Paso - Merchant',
    position: { lat: 31.7629678, lng: -106.3772533 },
    address: '7180 Merchant Ave, El Paso, TX 79915, USA'
  },
  {
    name: 'El Paso - Welch',
    position: { lat: 31.7719189, lng: -106.4186966 },
    address: '5850 Welch Ave, El Paso, TX 79905, USA'
  },
  {
    name: 'El Paso - Welch II',
    position: { lat: 31.7716689, lng: -106.4173992 },
    address: '5830 Welch Ave, El Paso, TX 79905, USA'
  },
  {
    name: 'El Paso - Cross Dock',
    position: { lat: 31.7599225, lng: -106.383094 },
    address: '7131 Copper Queen Dr, El Paso, TX 79915, USA'
  },
  {
    name: 'Santa Teresa',
    position: { lat: 31.8581499, lng: -106.6998358 },
    address: '4950 Avenida Creel, Santa Teresa, NM 88008, USA'
  },
  {
    name: 'Del Rio',
    position: { lat: 29.3533939, lng: -100.9324674 },
    address: '195 Frontera Road, Del Rio, TX 78840, USA'
  },
  {
    name: 'Laredo',
    position: { lat: 27.5933074, lng: -99.49763329999999 },
    address: '8900 San Gabriel Dr, Laredo, TX 78045, USA'
  }
];

// Add directions to each facility
export const getDirectionsUrl = (facility: typeof FACILITY_LOCATIONS[0]) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(facility.address)}`;
};
