// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPortafolio {
        nodes {
          uid
        }
      }
    }
  `)

  const template = path.resolve("src/templates/project.tsx")

  pages.data.allPrismicPortafolio.nodes.map(node => {
    createPage({
      path: `/portafolio/${node.uid}`,
      component: template,
      context: {
        uid: node.uid,
      },
    })
  })
}
