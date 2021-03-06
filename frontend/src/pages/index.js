import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"

const IndexPage = ({data}) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
        return (
          <div className="blog-post-preview" key={post.id}>
            <h1>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </h1>
            <h2>{post.frontmatter.date}</h2>
            <p>{post.excerpt}</p>
          </div>
        ) 
      })}
    </Layout>
)}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
