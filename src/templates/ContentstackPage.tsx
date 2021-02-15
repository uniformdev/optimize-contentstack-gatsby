import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

// Tracker and Component mapping to enable personalization
import { localTracker } from '../lib/local-tracker';
import { Components, componentMapper } from '../lib/componentMapper';
// Global Layouts
import { Layout } from '../layouts/default';

export default function ContentstackPage({ data }) {
  const { contentstackPage } = data;
  const trackerInstance = localTracker;

  return (
    <UniformTracker trackerInstance={trackerInstance} componentMapping={Components}>
      <Helmet
        htmlAttributes={{
          lang: 'en-us',
        }}
      >
        <meta charSet="utf-8" />
        <title>{`${contentstackPage.title} | UniformConf`}</title>
      </Helmet>
      <Layout>{contentstackPage?.components && componentMapper(contentstackPage)}</Layout>
    </UniformTracker>
  );
}

// Each of the component fragments are defined in their individual component files.
// note: $url variable comes from the `gatsby-node.js` context data.
export const query = graphql`
  query PageQuery($url: String!) {
    contentstackPage(url: { eq: $url }) {
      title
      url
      components {
        ...hero
        ...whyAttend
        ...callToAction
        ...personalizedHero
        ...registrationForm
        ...talkList
      }
    }
  }
`;
