import React, { useState, useMemo } from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { RichText } from "prismic-reactjs"
import styled from "styled-components"

import Layout from "../components/Layout"
import Header from "../components/Header"
import {
  PrismicPortafolioConnection,
  PrismicPortafolioPageConnection,
} from "../../graphql-types"
import Deco from "../images/portafolio.inline.svg"
import PortfolioItem from "../components/PortfolioItem"

interface Props {
  data: {
    allPrismicPortafolio: PrismicPortafolioConnection
    allPrismicPortafolioPage: PrismicPortafolioPageConnection
  }
}

const Quote = styled.div`
  line-height: 26px;
  font-family: "hv_museregular";
  padding-top: 80px;
`

const Letters = styled(Deco)`
  width: 85%;
  height: auto;
  margin-bottom: 85px;
`

const Button = styled.button`
  background: transparent;
  border: none;
  font-family: "hv_museregular";
  font-size: 24px;
  line-height: 30px;
  position: relative;
  padding-bottom: 25px;
  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1px;
    background-color: #000;
  }
`

export const query = graphql`
  {
    allPrismicPortafolio {
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
          featured
        }
        uid
      }
    }
    allPrismicPortafolioPage {
      nodes {
        data {
          quote {
            raw
          }
        }
      }
    }
  }
`

const Portafolio: React.FC<Props> = ({ data }) => {
  const items = data.allPrismicPortafolio.nodes
    .sort(a => {
      if (a.data?.featured) {
        return -1
      }
      return 1
    })
    .map(node => ({
      id: node.uid,
      place: node.data?.lugar?.text || "",
      imgFluid: node.data?.cover_image?.fluid,
      imgAlt: node.data?.cover_image?.alt || "",
      title: node.data?.title?.text || "",
    }))
  const [portfolioItems, setPortfolioItems] = useState(items.slice(0, 8))
  const hasItemsLeft = useMemo(() => items.length > portfolioItems.length, [
    items,
    portfolioItems,
  ])

  return (
    <Layout>
      <Header initialMenuColor="dark" />
      <Container className="mb-5 mb-md-0">
        <Row>
          <Col md={6} className="ml-auto">
            <RichText
              render={data.allPrismicPortafolioPage.nodes[0].data?.quote?.raw}
              Component={Quote}
            />
          </Col>
        </Row>
      </Container>
      <Letters />
      <Container>
        <Row>
          {portfolioItems.map(
            ({ id, place, imgFluid, imgAlt, title }, index) => (
              <Col
                md={6}
                key={id}
                className={
                  index < portfolioItems.length - 1
                    ? "mb-5 pb-5"
                    : "mb-md-5 pb-md-5"
                }
              >
                <PortfolioItem
                  portfolio={{
                    slug: id || "",
                    place,
                    imgFluid,
                    imgAlt,
                    title,
                  }}
                />
              </Col>
            )
          )}
        </Row>
        {hasItemsLeft && (
          <div className="text-center">
            <Button
              onClick={() => {
                setPortfolioItems(prev => items.slice(0, prev.length + 8))
              }}
            >
              MÁS BODAS
            </Button>
          </div>
        )}
      </Container>
    </Layout>
  )
}

export default Portafolio
