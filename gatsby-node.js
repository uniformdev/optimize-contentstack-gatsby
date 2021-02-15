const path = require('path');

exports.onPostBuild = ({ reporter }) => {
  reporter.info('Your Gatsby site has been built!');
};

// create contentstack pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const contentstackPageTemplate = path.resolve('./src/templates/ContentstackPage.tsx');

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
};
