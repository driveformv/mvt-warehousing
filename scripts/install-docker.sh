#!/bin/bash

# Script to install Docker Desktop from the downloaded DMG file

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Installing Docker Desktop...${NC}"

# Check if the DMG file exists
if [ ! -f "Docker.dmg" ]; then
    echo -e "${RED}Error: Docker.dmg file not found.${NC}"
    echo "Please make sure the download completed successfully."
    exit 1
fi

# Mount the DMG file
echo -e "${YELLOW}Mounting Docker.dmg...${NC}"
MOUNT_POINT=$(hdiutil attach Docker.dmg | grep Volumes | awk '{print $3}')

if [ -z "$MOUNT_POINT" ]; then
    echo -e "${RED}Error: Failed to mount Docker.dmg.${NC}"
    exit 1
fi

echo -e "${GREEN}Docker.dmg mounted at $MOUNT_POINT${NC}"

# Copy Docker.app to Applications folder
echo -e "${YELLOW}Installing Docker Desktop to Applications folder...${NC}"
cp -R "$MOUNT_POINT/Docker.app" /Applications/

# Check if the copy was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker Desktop installed successfully!${NC}"
else
    echo -e "${RED}Error: Failed to install Docker Desktop.${NC}"
    echo "You may need to manually copy Docker.app from $MOUNT_POINT to /Applications/"
fi

# Unmount the DMG file
echo -e "${YELLOW}Unmounting Docker.dmg...${NC}"
hdiutil detach "$MOUNT_POINT"

echo -e "${YELLOW}Starting Docker Desktop...${NC}"
open -a Docker

echo -e "${GREEN}Done!${NC}"
echo -e "${YELLOW}Please wait for Docker Desktop to start and complete its initialization.${NC}"
echo -e "${YELLOW}Once Docker is running, you can deploy the Google Maps Edge Function with:${NC}"
echo -e "${GREEN}npm run deploy:google-maps-api-key${NC}"
