import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import Decoration from "../../images/portafolio.inline.svg"
import PortfolioItem from "../PortfolioItem"
import { Query } from "../../../graphql-types"

const Letters = styled(Decoration)`
  width: 85%;
  transform: translateY(45%);
`

const ButtonWrapper = styled.div`
  text-align: center;
`

const MoreButton = styled(Link)`
  font-family: "hv_museregular";
  font-size: 24px;
  margin: auto;
  display: inline-block;
  padding-bottom: 25px;
  position: relative;
  color: inherit;
  text-decoration: none;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #000;
    bottom: 0;
    left: 0;
  }
`

const PortfolioGrid = React.forwardRef<any, any>((_props, ref) => {
  const { allPrismicPortafolio } = useStaticQuery<Query>(graphql`
    {
      allPrismicPortafolio(limit: 4) {
        nodes {
          data {
            cover_image {
              alt
              fluid {
                ...GatsbyPrismicImageFluid
              }
            }
            lugar {
              text
            }
            title {
              text
            }
          }
          uid
        }
      }
    }
  `)

  return (
    <div ref={ref}>
      <Letters />
      <Container>
        <Row>
          {allPrismicPortafolio.nodes.map(node => (
            <Col key={node.uid} md={6} className="mb-5">
              <PortfolioItem
                portfolio={{
                  slug: node.uid || "",
                  place: node.data?.lugar?.text || "",
                  imgFluid: node.data?.cover_image?.fluid,
                  imgAlt: node.data?.cover_image?.alt || "",
                  title: node.data?.title?.text || "",
                }}
              />
            </Col>
          ))}
        </Row>
        <ButtonWrapper>
          <MoreButton to="/portafolio">MÁS BODAS</MoreButton>
        </ButtonWrapper>
      </Container>
    </div>
  )
})

PortfolioGrid.displayName = "PortfolioGrid"

export default PortfolioGrid
