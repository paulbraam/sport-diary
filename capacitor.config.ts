import { type CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: process.env.APP_ID,
  appName: process.env.APP_NAME,
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: process.env.GOOGLE_SERVER_CLIENT_ID,
      forceCodeForRefreshToken: true
    },
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
