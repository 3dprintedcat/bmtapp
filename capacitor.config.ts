import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bmtapp.app',
  appName: 'bmtapp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
