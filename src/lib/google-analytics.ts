import { Analytics } from 'analytics';
import googleAnalyticsPlugin from '@analytics/google-analytics';
import segmentPlugin from '@analytics/segment';

const plugins = [];
if (process.env.GA_UA_ID) {
  plugins.push(
    googleAnalyticsPlugin({
      trackingId: process.env.GA_UA_ID,
      customDimensions: {
        strongestIntentMatch: 'dimension1',
        allIntentMatches: 'dimension2',
      },
    })
  );
}

if (process.env.SEGMENT_ID) {
  segmentPlugin({
    writeKey: process.env.SEGMENT_ID,
  });
}

export const analytics = Analytics({
  app: 'Uniform Optimize Gatsby.js Contentstack Example',
  debug: true,
  plugins: plugins,
});
