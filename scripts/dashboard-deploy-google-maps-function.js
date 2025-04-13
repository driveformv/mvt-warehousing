#!/usr/bin/env node

/**
 * Script to run the TypeScript deployment script for Google Maps Edge Function
 * This script compiles and runs the TypeScript script
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes for terminal output
const COLORS = {
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RED: '\x1b[31m',
  RESET: '\x1b[0m'
};

// Path to the TypeScript script
const tsScriptPath = path.join(__dirname, 'google-maps-dashboard-deploy-fixed.ts');

// Check if the TypeScript script exists
if (!fs.existsSync(tsScriptPath)) {
  console.error(`${COLORS.RED}Error: TypeScript script not found at ${tsScriptPath}${COLORS.RESET}`);
  process.exit(1);
}

try {
  // Check if ts-node is installed
  try {
    execSync('npx ts-node --version', { stdio: 'ignore' });
  } catch (error) {
    console.log(`${COLORS.YELLOW}Installing ts-node...${COLORS.RESET}`);
    execSync('npm install -g ts-node typescript @types/node dotenv', { stdio: 'inherit' });
  }

  // Run the TypeScript script using ts-node
  console.log(`${COLORS.GREEN}Running TypeScript deployment script...${COLORS.RESET}`);
  execSync(`npx ts-node "${tsScriptPath}"`, { stdio: 'inherit' });
} catch (error) {
  console.error(`${COLORS.RED}Failed to run TypeScript deployment script:${COLORS.RESET}`, error.message);
  process.exit(1);
}
