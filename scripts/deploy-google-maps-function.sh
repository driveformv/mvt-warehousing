#!/bin/bash

# Script to deploy the Google Maps Supabase Edge Function

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Deploying Google Maps Supabase Edge Function...${NC}"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}Error: Supabase CLI is not installed.${NC}"
    echo "Please install it first: npm install -g supabase"
    exit 1
fi

# Check if we're in the project root
if [ ! -d "supabase" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory.${NC}"
    exit 1
fi

# Set the Google Maps API key from .env.local if not already set
if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
    if [ -f ".env.local" ]; then
        # Extract the API key from .env.local
        API_KEY=$(grep NEXT_PUBLIC_GOOGLE_MAPS_API_KEY .env.local | cut -d '=' -f2)
        if [ -n "$API_KEY" ]; then
            echo -e "${GREEN}Found Google Maps API key in .env.local${NC}"
            export GOOGLE_MAPS_API_KEY=$API_KEY
        else
            echo -e "${RED}Error: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not found in .env.local${NC}"
            echo "Please set it manually: export GOOGLE_MAPS_API_KEY=your_api_key"
            exit 1
        fi
    else
        echo -e "${RED}Error: .env.local file not found and GOOGLE_MAPS_API_KEY not set.${NC}"
        echo "Please set it manually: export GOOGLE_MAPS_API_KEY=your_api_key"
        exit 1
    fi
fi

echo -e "${YELLOW}Setting Supabase secrets...${NC}"
supabase secrets set GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY

echo -e "${YELLOW}Deploying Google Maps function...${NC}"
supabase functions deploy google-maps --no-verify-jwt

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Google Maps function deployed successfully!${NC}"
    echo -e "${YELLOW}Testing the function...${NC}"
    
    # Get the Supabase project URL
    PROJECT_URL=$(supabase status | grep "API URL" | awk '{print $3}')
    
    if [ -n "$PROJECT_URL" ]; then
        echo -e "${GREEN}Your Google Maps API is available at:${NC}"
        echo "$PROJECT_URL/functions/v1/google-maps"
        echo -e "${YELLOW}You can test it with:${NC}"
        echo "curl -X POST $PROJECT_URL/functions/v1/google-maps/geocode -H \"Content-Type: application/json\" -d '{\"address\":\"1600 Amphitheatre Parkway, Mountain View, CA\"}'"
    else
        echo -e "${YELLOW}Couldn't determine your Supabase project URL.${NC}"
        echo "Please check your function in the Supabase dashboard."
    fi
else
    echo -e "${RED}Deployment failed.${NC}"
    echo "Please check the error messages above."
    exit 1
fi

echo -e "${GREEN}Done!${NC}"
