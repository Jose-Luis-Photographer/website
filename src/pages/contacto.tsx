import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Header, { Section } from "../components/Header"
import Deco from "../images/contacto.inline.svg"
import { PrismicContacto } from "../../graphql-types"

interface Props {
  data: {
    prismicContacto: PrismicContacto
  }
}

const Decoration = styled(Deco)`
  width: 85%;
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
        facebook {
          url
        }
        instagram {
          url
        }
        behance {
          url
        }
        mywed {
          url
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
      <Header sections={sections} />
      <Wrapper>
        <Decoration />
        <Container className="mt-5 pt-5">
          <Row className="pb-5">
            <Col md={4}>
              <a
                href={`https://wa.me/+52${phoneNumber.trim()}`}
                target="_blank"
                rel="noreferrer"
              >
                wa: {phoneNumber}
              </a>
            </Col>
            <Col md={4}>
              <a href={`mailto:${email}`}>{email}</a>
            </Col>
          </Row>
          <Row className="pb-5">
            <Col md={4} className="ml-auto">
              <a href={fbUrl} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </Col>
            <Col md={4}>
              <a href={igUrl} target="_blank" rel="noreferrer">
                Instragram
              </a>
            </Col>
          </Row>
          <Row className="pb-5">
            <Col md={4}>
              <a href={behanceUrl} target="_blank" rel="noreferrer">
                Behance
              </a>
            </Col>
            <Col md={4} className="ml-auto">
              <a href={mywedUrl} target="_blank" rel="noreferrer">
                MyWed
              </a>
            </Col>
          </Row>
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
