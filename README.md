# Optimize Contentstack Gatsby.js Example Project
This is a [Gatsby](https://www.gatsbyjs.com/) project bootstrapped with [`Gatsby cli`](https://www.gatsbyjs.com/docs/tutorial/part-zero/#install-git).


## Getting Started
### Configure environment variables
1. Copy .env.example to .env
2. Set Contentstack variable values to match your CMS [see example config](#example-gatsby-configjs)
3. Configure your uniform data source

### Install Gatsby CLI tool if you haven't already
```shell
npm install -g @gatsby/cli
```

### Install packages
```shell
npm i
# or
yarn
```

### Run the development server
```shell
npm run develop
# or
yarn develop
```

* open <http://localhost:8000/> with your browser to see the website locally.
* open <http://localhost:8000/___graphql> to see your graphql explorer and run / test your graphql queries.


### Build for production and launch server
```shell
npm run build
# or
yarn build
```

### Example gatsby-config.js
```javascript
 const dotenv = require('dotenv');

 dotenv.config({
   path: `.env`
 });

module.exports = {
  siteMetadata: {
    title: 'uniform-optimize-gatsby-contentstack-starter',    
    description: 'UniformConf, a Uniform Optimize demo site'
  },
  /* Your site config here */
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
}
```


### Example gatsby-node.js

Before setting the gatsby-node.js configuration, you must create a template inside `src/templates/`. In our example we create a `ContentstackPage.tsx` file in the templates directory which we map to in our `gatsby-nodes.js` file.

```javascript
const path = require("path")

exports.onPostBuild = ({ reporter }) => {
  reporter.info("Your Gatsby site has been built!")
}

// creatre contentstack pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const contentstackPageTemplate = path.resolve(
    "./src/templates/ContentstackPage.tsx"
  )

  // get a list of all the pages in the Contentstack stack
  const result = await graphql(`
    query {
      allContentstackPage {
        edges {
          node {
            uid
            url
            title
          }
        }
      }
    }
  `);

  // iterate each contentstack page and use the `createPage` action to programmatically
  // create gatsby pages.
  // the `context` object is passed to each page as props
  result.data.allContentstackPage.edges.forEach((edge) => {
    createPage({
      path: `${edge.node.url}`,
      component: contentstackPageTemplate,
      context: {
        title: edge.node.title,
        url: edge.node.url,
        components: edge.node.components, // array of components
      },
    });
  });
}
```

## Learn More
To learn more about Gatsby.js, take a look at the following resources:
- [Gatsby Documentation](https://www.gatsbyjs.com/docs/) - learn about Gatsby.js features and API.
- [Gatsby Contribution](https://github.com/gatsbyjs/gatsby#-how-to-contribute) - Contribute to Gatsby
- [Gatsby Source Contentstack](https://www.gatsbyjs.com/plugins/gatsby-source-contentstack/?=content)


## Known Issues
Gatsby will try and make requests to ```page-data``` and throw a console error which can impact lighthouse scores. See [Github issue](https://github.com/gatsbyjs/gatsby/issues/16097) for more details