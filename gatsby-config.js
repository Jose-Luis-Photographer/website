require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Jose Luis Photographer`,
    description: `Un ser humano amante de los momentos, de conocer, experimentar, disfrutar, de reír, ese soy yo.`,
    author: `@oswaldo_zc`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `joseluis`,
        accessToken: `${process.env.API_KEY}`,
        //linkResolver: () => post => `/blog/${post.uid}`,
        schemas: {
          homepage: require(`./src/schemas/homepage.json`),
          portafolio: require(`./src/schemas/portafolio.json`),
          resenas: require(`./src/schemas/resenas.json`),
          portafolio_page: require(`./src/schemas/portafolio_page.json`),
          acerca: require(`./src/schemas/acerca.json`),
          contacto: require(`./src/schemas/contacto.json`),
          menu: require(`./src/schemas/menu.json`),
        },
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
