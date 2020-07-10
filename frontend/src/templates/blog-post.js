import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"

// import '../css/blog-post.css';

export default function Template({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout >
      <Helmet title={`🌼🐰🔮🖤 - ${post.frontmatter.title}`} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query BlogPostByPath($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`