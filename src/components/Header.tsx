import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"

import LogoImg from "../images/logo.inline.svg"
import MenuSvg from "../images/menu.inline.svg"
import CloseSvg from "../images/close.inline.svg"
import { Query } from "../../graphql-types"

export interface Section {
  color: "dark" | "light"
  offsetTop: number
  offsetBottom: number
}

interface Props {
  sections?: Section[]
  initialMenuColor?: "light" | "dark"
}

const StyledHeader = styled.header`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px 15px;
`

const Logo = styled(LogoImg)`
  max-width: 180px;
`

const MenuBtn = styled.button`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1999;
  background: transparent;
  border: none;
  transform: translateX(30%);
  span {
    svg {
      path {
        transition: all 0.3s ease-in-out;
      }
    }
    &.light {
      svg {
        path {
          fill: #fff;
        }
      }
    }
    &.dark {
      svg {
        path {
          fill: #000;
        }
      }
    }
  }
`

const FixedMenu = styled.div`
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  transform: translateX(-100%);
  transition: all 0.3s ease-in-out;
  &.opened {
    transform: translateX(0);
  }
  h2 {
    font-family: "hv_museregular";
    text-align: center;
  }
`

const MenuImg = styled.div`
  position: relative;
  &:after {
    content: "";
    display: block;
    padding-top: 100%;
  }
`

const CloseBtn = styled.button`
  position: absolute;
  top: 40px;
  right: 50px;
  background: transparent;
  border: none;
  svg {
    width: 30px;
  }
`

const Header: React.FC<Props> = ({
  sections = [],
  initialMenuColor = "light",
}) => {
  const menuTextRef = useRef<null | HTMLElement>(null)
  const [color, setColor] = useState<"light" | "dark">(initialMenuColor)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const menuBtnHeight = menuTextRef.current?.offsetHeight || 0
      const windowHeight = window.innerHeight
      const bottomOfScreen = window.scrollY + windowHeight
      const scrollLimit =
        bottomOfScreen - menuBtnHeight - (windowHeight - menuBtnHeight) / 2
      const overSection = sections.find(
        section =>
          scrollLimit > section.offsetTop && scrollLimit < section.offsetBottom
      )
      if (overSection) {
        setColor(overSection.color)
      }
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections, menuTextRef, setColor])

  const { prismicMenu } = useStaticQuery<Query>(graphql`
    {
      prismicMenu {
        data {
          acerca {
            alt
            fluid {
              ...GatsbyPrismicImageFluid
            }
          }
          contacto {
            alt
            fluid {
              ...GatsbyPrismicImageFluid
            }
          }
          portafolio {
            alt
            fluid {
              ...GatsbyPrismicImageFluid
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <StyledHeader>
        <Link to="/">
          <Logo />
        </Link>
      </StyledHeader>
      <MenuBtn
        onClick={() => {
          setOpened(true)
        }}
      >
        <span ref={menuTextRef} className={`d-block ${color}`}>
          <MenuSvg />
        </span>
      </MenuBtn>
      <FixedMenu
        className={`d-flex flex-column align-items-center pt-4${
          opened ? " opened" : ""
        }`}
      >
        <CloseBtn
          onClick={() => {
            setOpened(false)
          }}
        >
          <CloseSvg />
        </CloseBtn>
        <Logo className="my-auto" />
        <Container className="my-auto py-4">
          <Row>
            <Col md={4}>
              <Link to="/portafolio">
                <h2 className="h2">Portafolio</h2>
                <MenuImg>
                  {prismicMenu?.data?.portafolio?.fluid && (
                    <Img
                      fluid={prismicMenu.data.portafolio.fluid}
                      alt={prismicMenu.data.portafolio.alt || ""}
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
                </MenuImg>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="/acerca">
                <MenuImg>
                  {prismicMenu?.data?.acerca?.fluid && (
                    <Img
                      fluid={prismicMenu.data.acerca.fluid}
                      alt={prismicMenu.data.acerca.alt || ""}
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
                </MenuImg>
                <h2 className="h2">About</h2>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="/contacto">
                <h2 className="h2">Contacto</h2>
                <MenuImg>
                  {prismicMenu?.data?.contacto?.fluid && (
                    <Img
                      fluid={prismicMenu.data.contacto.fluid}
                      alt={prismicMenu.data.contacto.alt || ""}
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
                </MenuImg>
              </Link>
            </Col>
          </Row>
        </Container>
      </FixedMenu>
    </>
  )
}

export default Header
