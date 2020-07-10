const path = require("path")
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    // reporter.panicOnBuild(`Error while running GraphQL query.`)
    console.error('Error')
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const path = node.frontmatter.title.split(' ').join('-')
    console.log(path)
    createPage({
      path: node.frontmatter.title.split(' ').join('-'),
      component: blogPostTemplate,
      context: {
        title: node.frontmatter.title,
      }, // additional data can be passed via context
    })
  })
}