const dotenv = require('dotenv');

dotenv.config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: 'UniformConf - a Uniform Optimize demo site',
    description: 'UniformConf, a Uniform Optimize demo site',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-contentstack`,
      options: {
        // Required: API Key is a unique key assigned to each stack.
        api_key: process.env.CONTENTSTACK_STACK_API_KEY,

        // Required: Delivery Token is a read-only credential.
        delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,

        // Required: Environment where you published your data.
        environment: process.env.CONTENTSTACK_ENVIRONMENT,

        // Optional: expediteBuild set this to either true or false
        expediteBuild: process.env.NODE_ENV === 'production',

        // Optional: Specify true if you want to generate custom schema
        enableSchemaGeneration: true,

        // Optional: Specify a different prefix for types. This is useful in cases where you have multiple instances of the plugin to be connected to different stacks.
        type_prefix: `Contentstack`, // (default)

        // Optional: Specify true if you want to download all your contentstack images locally
        downloadImages: false,
      },
    },
  ],
};
