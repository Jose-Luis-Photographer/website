import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"

import { PrismicImageFluidType } from "../../graphql-types"

interface Props {
  portfolio: {
    slug: string
    place: string
    imgFluid: PrismicImageFluidType | null | undefined
    imgAlt: string
    title: string
  }
}

const Place = styled.div`
  text-align: right;
  font-family: "hv_museregular";
  margin-bottom: 20px;
  font-size: 18px;
`

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  &:after {
    content: "";
    display: block;
    padding-top: 66%;
  }
`

const Title = styled.h2`
  font-size: 18px;
`

const PortfolioItem: React.FC<Props> = ({ portfolio }) => {
  return (
    <Link to={`/portafolio/${portfolio.slug}`}>
      <Place>{portfolio.place}</Place>
      <ImageWrapper>
        {portfolio.imgFluid && (
          <Img
            fluid={portfolio.imgFluid}
            alt={portfolio.imgAlt}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              objectFit: "cover",
            }}
          />
        )}
      </ImageWrapper>
      <Title>{portfolio.title}</Title>
    </Link>
  )
}

export default PortfolioItem
