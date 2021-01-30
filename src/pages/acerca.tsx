import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import styled from "styled-components"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Header from "../components/Header"
import {
  PrismicAcercaConnection,
  PrismicResenasConnection,
} from "../../graphql-types"
import Deco from "../images/about.inline.svg"
import Pine from "../images/pine.inline.svg"
import Review from "../components/Review"
import SEO from "../components/seo"

interface Props {
  data: {
    allPrismicAcerca: PrismicAcercaConnection
    allPrismicResenas: PrismicResenasConnection
  }
}

export const query = graphql`
  {
    allPrismicAcerca {
      nodes {
        data {
          encabezado {
            text
          }
          contenido {
            raw
          }
          imagen {
            fluid {
              ...GatsbyPrismicImageFluid
            }
            alt
          }
          imagen_resenas {
            fluid {
              ...GatsbyPrismicImageFluid
            }
            alt
          }
        }
      }
    }
    allPrismicResenas {
      nodes {
        id
        data {
          title {
            raw
          }
          short_text {
            raw
          }
          resena_completa {
            raw
          }
          imagen_novios {
            fluid {
              ...GatsbyPrismicImageFluid
            }
            alt
          }
        }
      }
    }
  }
`

const Content = styled.div`
  p {
    line-height: 26px;
    &:not(:last-of-type) {
      margin-bottom: 1.5rem;
    }
  }
`

const Decoration = styled(Deco)`
  width: 55%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: 0;
  transform: translateY(25%);
  z-index: 2;
  position: relative;
`

const Divider = styled.div`
  span {
    flex: 1;
    height: 1px;
    background-color: #000;
    margin-top: 15px;
  }
  svg {
    margin: 0 20px;
  }
`

const BannerWrapper = styled.div`
  position: relative;
  h2 {
    font-family: "hv_museregular";
    position: absolute;
    color: #fff;
    bottom: 25px;
    left: 25px;
    font-size: 1.8rem;
  }
`

const Acerca: React.FC<Props> = ({ data }) => {
  const image = data.allPrismicAcerca.nodes[0].data?.imagen
  const encabezado = data.allPrismicAcerca.nodes[0].data?.encabezado?.text
  const imageFluid = image?.fluid
  const imageAlt = image?.alt
  const reviews = data.allPrismicResenas.nodes.map(node => ({
    id: node.id,
    title: node.data?.title?.raw,
    shortText: node.data?.short_text?.raw,
    fullText: node.data?.resena_completa?.raw,
    image: node.data?.imagen_novios?.fluid,
    imageAlt: node.data?.imagen_novios?.alt,
  }))
  const reviewsImg = data.allPrismicAcerca.nodes[0].data?.imagen_resenas
  const reviewsImgFluid = reviewsImg?.fluid
  const reviewsImgAlt = reviewsImg?.alt || ""

  return (
    <Layout>
      <SEO title="Acerca" />
      <Header initialMenuColor="dark" />
      <Decoration />
      <Container className="mt-5 mt-md-0">
        <Row className="align-items-end pb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="h1 mb-4">{encabezado}</h2>
            <RichText
              render={data.allPrismicAcerca.nodes[0].data?.contenido?.raw}
              Component={Content}
            />
          </Col>
          <Col md={6}>
            {imageFluid && <Img fluid={imageFluid} alt={imageAlt || ""} />}
          </Col>
        </Row>
        <Divider className="d-flex align-items-center mt-5">
          <span></span>
          <Pine />
          <span></span>
        </Divider>
        <Row className="mt-5">
          {reviews.slice(0, 3).map(review => (
            <Col key={review.id} md={4} className="mb-5">
              <Review
                title={review.title}
                shortText={review.shortText}
                fullText={review.fullText}
                image={review.image}
                imageAlt={review.imageAlt}
              />
            </Col>
          ))}
          {reviewsImgFluid && (
            <Col md={8} className="mb-5">
              <BannerWrapper>
                <Img fluid={reviewsImgFluid} alt={reviewsImgAlt} />
                <h2>
                  Los novios <br /> dicen de mi
                </h2>
              </BannerWrapper>
            </Col>
          )}
          {reviews.slice(3, 4).map(review => (
            <Col key={review.id} md={4} className="mb-5 mt-auto">
              <Review
                title={review.title}
                shortText={review.shortText}
                fullText={review.fullText}
                image={review.image}
                imageAlt={review.imageAlt}
              />
            </Col>
          ))}
          {reviews.slice(4).map(review => (
            <Col key={review.id} md={4} className="mb-5">
              <Review
                title={review.title}
                shortText={review.shortText}
                fullText={review.fullText}
                image={review.image}
                imageAlt={review.imageAlt}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default Acerca
