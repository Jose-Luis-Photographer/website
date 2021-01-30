import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Header, { Section } from "../components/Header"
import Deco from "../images/contacto.inline.svg"
import { PrismicContacto } from "../../graphql-types"
import SEO from "../components/seo"

interface Props {
  data: {
    prismicContacto: PrismicContacto
  }
}

const Decoration = styled(Deco)`
  width: 85%;
  height: auto;
`

const Wrapper = styled.div`
  font-family: "hv_museregular";
  position: relative;
  a {
    transition: all 0.3s ease-in-out;
    &:hover {
      opacity: 0.5;
    }
  }
`

const PortfolioBanner = styled(Link)`
  height: 400px;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  background: lightgray;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  @media (min-width: 768px) {
    position: absolute;
    height: 100%;
    width: 15%;
  }
  h3 {
    color: #fff;
    font-size: 50px;
    z-index: 2;
    position: relative;
    transition-delay: 0.3s;
    transition: all 0.3s ease-in-out;
    @media (min-width: 768px) {
      opacity: 0;
    }
  }
  &:hover {
    opacity: 1 !important;
    @media (min-width: 768px) {
      width: 60%;
      h3 {
        opacity: 1;
      }
    }
  }
`

export const query = graphql`
  {
    prismicContacto {
      data {
        whatsapp {
          text
        }
        correo {
          text
        }
        imagen {
          fluid {
            ...GatsbyPrismicImageFluid
          }
          alt
        }
        body {
          ... on PrismicContactoBodyLinkBlock {
            id
            items {
              link {
                url
                target
              }
              title1 {
                text
              }
            }
          }
        }
      }
    }
  }
`

const Contacto: React.FC<Props> = ({ data }) => {
  const [sections, setSections] = useState<Section[]>([])
  const contact = data.prismicContacto.data
  const phoneNumber = contact?.whatsapp?.text || ""
  const email = contact?.correo?.text || ""
  const fbUrl = contact?.facebook?.url || ""
  const igUrl = contact?.instagram?.url || ""
  const behanceUrl = contact?.behance?.url || ""
  const mywedUrl = contact?.mywed?.url || ""
  const bannerImgFluid = contact?.imagen?.fluid
  const bannerImgAlt = contact?.imagen?.alt || ""
  const linkBlocks = contact.body
  const menuColorChanger = useRef<null | HTMLElement>(null)

  useEffect(() => {
    const menuColorChangerTop = menuColorChanger.current?.offsetTop || 0
    const menuColorChangerHeight = menuColorChanger.current?.clientHeight || 0
    setSections([
      {
        color: "dark",
        offsetTop: menuColorChangerTop,
        offsetBottom: menuColorChangerTop + menuColorChangerHeight,
      },
    ])
  }, [menuColorChanger, setSections])

  return (
    <Layout>
      <SEO title="Contacto" />
      <Header sections={sections} />
      <Wrapper>
        <Decoration />
        <Container className="mt-5 pt-5">
          <Row className="pb-5">
            <Col md={4} className="mb-2 mb-md-0">
              <a
                href={`https://wa.me/+52${phoneNumber.trim()}`}
                target="_blank"
                rel="noreferrer"
              >
                wa: {phoneNumber}
              </a>
            </Col>
            <Col md={4} className="mb-2 mb-md-0">
              <a href={`mailto:${email}`}>{email}</a>
            </Col>
          </Row>
          {linkBlocks.map((block, index) => {
            const rowIsEven = (index + 1) % 2 === 0

            return (
              <Row key={block.id} className="pb-5">
                {block.items.map((item, innerIndex) => {
                  const colIsEven = (innerIndex + 1) % 2 === 0

                  return (
                    <Col
                      key={item.link.url}
                      md={4}
                      className={`${
                        (rowIsEven && colIsEven) || (!rowIsEven && !colIsEven)
                          ? "ml-auto "
                          : ""
                      }mb-2 mb-md-0`}
                    >
                      <a href={item.link.url} target="_blank" rel="noreferrer">
                        {item.title1.text}
                      </a>
                    </Col>
                  )
                })}
              </Row>
            )
          })}
        </Container>
        <PortfolioBanner to="/portafolio" className="pb-5">
          <h3>Portafolio</h3>
          {bannerImgFluid && (
            <Img
              fluid={bannerImgFluid}
              alt={bannerImgAlt}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </PortfolioBanner>
      </Wrapper>
      <div ref={menuColorChanger}></div>
    </Layout>
  )
}

export default Contacto
