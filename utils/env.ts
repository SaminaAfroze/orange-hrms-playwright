import dotenv from 'dotenv';
import path from 'path';

dotenv.config(); // load .env first

const envFile = `.env.${process.env.ENV || 'local'}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

export const env = {
  ENV_NAME: process.env.ENV_NAME || 'local',
  BASE_URL: process.env.BASE_URL || '',
  HRMS_USERNAME: process.env.HRMS_USERNAME || '',
  HRMS_PASSWORD: process.env.HRMS_PASSWORD || '',
  HEADLESS: process.env.HEADLESS === 'true',
  BROWSER: process.env.BROWSER || 'chromium',
};