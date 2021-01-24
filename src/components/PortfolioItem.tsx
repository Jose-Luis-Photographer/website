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

const HoverTitleWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.8rem;
  h2 {
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    h2 {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const PortfolioItem: React.FC<Props> = ({ portfolio }) => {
  const splitTitle = portfolio.title.split("&")
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
        <HoverTitleWrapper>
          <h2>{splitTitle[0]}</h2>
          <h2>& {splitTitle[1]}</h2>
        </HoverTitleWrapper>
      </ImageWrapper>
      <Title>{portfolio.title}</Title>
    </Link>
  )
}

export default PortfolioItem
