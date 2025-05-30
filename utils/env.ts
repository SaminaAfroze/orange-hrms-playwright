import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.ENV || 'dev'}`),
});

export const ENV = {
  baseURL: process.env.BASE_URL!,
  username: process.env.HRMS_USERNAME!,
  password: process.env.HRMS_PASSWORD!,
  envName: process.env.ENV_NAME!, 
};
