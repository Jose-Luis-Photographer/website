import React, { useRef, useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import moment from "moment"
import "moment/locale/es-mx"
import { Container, Row, Col, Modal } from "react-bootstrap"
import { RichText } from "prismic-reactjs"
import Slider from "react-slick"

import Layout from "../components/Layout"
import Header, { Section } from "../components/Header"
import {
  PrismicPortafolio,
  PrismicPortafolioBodyTituloPrimaryType,
  PrismicPortafolioBodyImagenesParalelasPrimaryType,
  PrismicPortafolioBodyImagenFullPrimaryType,
  PrismicPortafolioBodyFraseDestacadaPrimaryType,
  PrismicPortafolioConnection,
} from "../../graphql-types"
import Deco from "../images/portafolio.inline.svg"
import ChevronRight from "../images/chevron-right.inline.svg"
import ChevronLeft from "../images/chevron-left.inline.svg"

interface Props {
  data: {
    prismicPortafolio: PrismicPortafolio
    allPrismicPortafolio: PrismicPortafolioConnection
  }
}

const ProjectTitle = styled.h1`
  @media (max-width: 767px) {
    font-size: 25px !important;
  }
`

const Cover = styled.div`
  position: relative;
  &:after {
    content: "";
    display: block;
    padding-top: 55%;
  }
`

const CoverInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  h1 {
    font-size: 60px;
  }
`

const TimeAndPlace = styled.div`
  font-family: "hv_museregular";
`

const Quote = styled.div`
  font-family: "hv_museregular";
  &:first-of-type {
    margin-left: auto;
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  &:last-of-type {
    margin-top: auto;
    font-size: 2rem;
    line-height: 2.5rem;
  }
`

const PortafolioDeco = styled(Deco)`
  width: 85%;
`

const SuggestedItemImg = styled.div`
  position: relative;
  background: lightgray;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    padding-top: 115%;
  }
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    padding-bottom: 2.5rem;
    transition: all 1s ease-in-out;
  }
  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin-top: auto;
  }
  &:hover {
    & > div {
      transform: scale(1.1);
    }
  }
`

const GalleryBtn = styled.button`
  background: transparent;
  color: #fff;
  border: none;
  font-family: "hv_museregular";
  font-size: 1.2rem;
  position: relative;
  padding-bottom: 5px;
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
  }
`

const PrevArrow = styled(ChevronLeft)`
  width: 25px;
  height: auto;
`

const PrevArrowWrapper = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  left: 15px;
  margin: auto;
`

const NextArrow = styled(ChevronRight)`
  width: 25px;
  height: auto;
`

const NextArrowWrapper = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 15px;
  z-index: 2;
  margin: auto;
`

const Project: React.FC<Props> = ({ data }) => {
  const [sections, setSections] = useState<Section[]>([])
  const [openGallery, setOpenGallery] = useState(false)
  const coverSection = useRef<null | HTMLDivElement>(null)
  const infoSection = useRef<null | HTMLDivElement>(null)
  moment.locale("es-MX")
  const portafolio = data.prismicPortafolio.data
  const coverFluid = portafolio?.cover_image?.fluid
  const coverAlt = portafolio?.cover_image?.alt
  const title = portafolio?.title?.text
  const date = moment(portafolio?.fecha).format("DD MMMM YYYY")
  const place = portafolio?.lugar?.text
  const gallery = portafolio?.galeria
  const slices = portafolio?.body
  const suggestedProjects = data.allPrismicPortafolio.nodes.map(node => ({
    slug: node.uid,
    imageFluid: node.data?.cover_image?.fluid,
    imageAlt: node.data?.cover_image?.alt,
    title: node.data?.title?.text,
  }))

  const sliderSettings = {
    prevArrow: (
      <PrevArrowWrapper>
        <PrevArrow />
      </PrevArrowWrapper>
    ),
    nextArrow: (
      <NextArrowWrapper>
        <NextArrow />
      </NextArrowWrapper>
    ),
  }

  useEffect(() => {
    const coverSectionTop = coverSection?.current?.offsetTop || 0
    const coverSectionHeight = coverSection?.current?.clientHeight || 0
    const infoSectionTop = infoSection?.current?.offsetTop || 0
    const infoSectionHeight = infoSection?.current?.clientHeight || 0
    setSections([
      {
        color: "light",
        offsetTop: coverSectionTop,
        offsetBottom: coverSectionTop + coverSectionHeight,
      },
      {
        color: "dark",
        offsetTop: infoSectionTop,
        offsetBottom: infoSectionTop + infoSectionHeight,
      },
    ])
  }, [coverSection, setSections, infoSection])

  return (
    <Layout>
      <Header sections={sections} />
      <Cover ref={coverSection}>
        {coverFluid && (
          <Img
            fluid={coverFluid}
            alt={coverAlt || ""}
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
        <CoverInner>
          <Container className="pb-5">
            <Row className="align-items-end">
              <Col
                md={3}
                className="order-1 order-md-0 text-center text-md-left"
              >
                <GalleryBtn
                  onClick={() => {
                    setOpenGallery(true)
                  }}
                >
                  MÁS
                </GalleryBtn>
              </Col>
              <Col md={6} className="order-0 order-md-1">
                <ProjectTitle className="text-white text-center mb-4 mb-md-0">
                  {title}
                </ProjectTitle>
              </Col>
            </Row>
          </Container>
        </CoverInner>
      </Cover>
      <Container ref={infoSection}>
        <TimeAndPlace className="py-5 text-center">
          <p className="mb3">{date}</p>
          <p>{place}</p>
        </TimeAndPlace>
      </Container>
      {slices?.map(slice => {
        const slicePrimary: any = slice?.primary
        switch (slice?.slice_type) {
          case "titulo":
            return (
              <Container key={slice.id} className="mb-3 text-center">
                <h2 className="h2">{slicePrimary.text.text}</h2>
              </Container>
            )
          case "imagenes_paralelas":
            return (
              <Container key={slice.id} className="mb-5 px-4" fluid>
                <Row>
                  <Col md={6} className="mb-4 mb-md-0">
                    {slicePrimary.imagen_izquierda?.fluid && (
                      <Img
                        fluid={slicePrimary.imagen_izquierda.fluid}
                        alt={slicePrimary.imagen_izquierda.alt || ""}
                      />
                    )}
                  </Col>
                  <Col md={6}>
                    {slicePrimary.imagen_derecha?.fluid && (
                      <Img
                        fluid={slicePrimary.imagen_derecha.fluid}
                        alt={slicePrimary.imagen_derecha.alt || ""}
                      />
                    )}
                  </Col>
                </Row>
              </Container>
            )
          case "imagen_full":
            return slicePrimary.imagen?.fluid ? (
              <Img
                key={slice.id}
                fluid={slicePrimary.imagen.fluid}
                alt={slicePrimary.imagen.alt || ""}
                className="mb-5"
              />
            ) : null
          case "frase_destacada":
            return (
              <Container key={slice.id} className="mb-5">
                <Row>
                  <Col md={6}>
                    {slicePrimary.imagen?.fluid && (
                      <Img
                        fluid={slicePrimary.imagen.fluid}
                        alt={slicePrimary.imagen.alt || ""}
                      />
                    )}
                  </Col>
                  <Col md={6} className="d-flex flex-column">
                    <RichText
                      render={slicePrimary.heading.raw}
                      Component={Quote}
                    />
                    <RichText
                      render={slicePrimary.frase_destacada.raw}
                      Component={Quote}
                    />
                  </Col>
                </Row>
              </Container>
            )
          default:
            return null
        }
      })}
      {suggestedProjects.length > 0 && (
        <>
          <Container className="mt-5">
            <div className="border-top border-dark"></div>
          </Container>
          <PortafolioDeco />
          <Container>
            <Row>
              {suggestedProjects.map(project => (
                <Col key={project.slug} md={4} className="mb-4 mb-md-0">
                  <Link to={`/portafolio/${project.slug}`}>
                    <SuggestedItemImg>
                      {project.imageFluid && (
                        <Img
                          fluid={project.imageFluid}
                          alt={project.imageAlt || ""}
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
                      <div>
                        <h2>{project.title}</h2>
                      </div>
                    </SuggestedItemImg>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
      <Modal
        show={openGallery}
        onHide={() => {
          setOpenGallery(false)
        }}
        size="xl"
        centered
      >
        <Modal.Body>
          <Slider {...sliderSettings}>
            {gallery?.map(slide => {
              if (slide?.imagen?.fluid) {
                return (
                  <Img
                    fluid={slide.imagen.fluid}
                    alt={slide.imagen.alt || ""}
                  />
                )
              }
              return null
            })}
          </Slider>
        </Modal.Body>
      </Modal>
    </Layout>
  )
}

export const query = graphql`
  query ProjectBySlug($uid: String!) {
    prismicPortafolio(uid: { eq: $uid }) {
      data {
        cover_image {
          fluid {
            ...GatsbyPrismicImageFluid
          }
          alt
        }
        title {
          text
        }
        fecha
        lugar {
          text
        }
        galeria {
          imagen {
            alt
            fluid {
              ...GatsbyPrismicImageFluid
            }
          }
        }
        body {
          ... on PrismicPortafolioBodyTitulo {
            id
            slice_type
            primary {
              text {
                text
              }
            }
          }
          ... on PrismicPortafolioBodyImagenesParalelas {
            id
            slice_type
            primary {
              imagen_izquierda {
                fluid {
                  ...GatsbyPrismicImageFluid
                }
                alt
              }
              imagen_derecha {
                fluid {
                  ...GatsbyPrismicImageFluid
                }
                alt
              }
            }
          }
          ... on PrismicPortafolioBodyImagenFull {
            id
            slice_type
            primary {
              imagen {
                fluid {
                  ...GatsbyPrismicImageFluid
                }
                alt
              }
            }
          }
          ... on PrismicPortafolioBodyFraseDestacada {
            id
            slice_type
            primary {
              frase_destacada {
                raw
              }
              heading {
                raw
              }
              imagen {
                fluid {
                  ...GatsbyPrismicImageFluid
                }
                alt
              }
            }
          }
        }
      }
    }
    allPrismicPortafolio(limit: 3, filter: { uid: { ne: $uid } }) {
      nodes {
        uid
        data {
          cover_image {
            fluid {
              ...GatsbyPrismicImageFluid
            }
            alt
          }
          title {
            text
          }
        }
      }
    }
  }
`

export default Project
