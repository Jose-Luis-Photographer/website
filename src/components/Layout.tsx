import React from "react"
import { Reset } from "styled-reset"
import { createGlobalStyle, css } from "styled-components"
import "slick-carousel/slick/slick.css"
import "@fontsource/work-sans/200.css"
import "@fontsource/work-sans/400.css"
import "bootstrap/dist/css/bootstrap.min.css"

import HvMuseWoff from "../fonts/hv_muse-webfont.woff"
import HvMuseWoff2 from "../fonts/hv_muse-webfont.woff2"
import Footer from "./Footer"

const GlobalStyle = createGlobalStyle`${css`
  @font-face {
    font-family: "hv_museregular";
    src: url("${HvMuseWoff2}") format("woff2"),
      url("${HvMuseWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  * {
    box-sizing: border-box;
  }
  body,
  html {
    font-family: "Work Sans", sans-serif;
    font-weight: 200;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 18px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    font-family: "hv_museregular" !important;
    font-weight: normal;
  }
  a {
    &,
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
  button {
    coursor: pointer;
    &:focus {
      outline: none;
    }
  }
`}
`

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      {children}
      <Footer />
    </>
  )
}

export default Layout
