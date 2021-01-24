import React from "react"
import styled from "styled-components"
import { Container } from "react-bootstrap"
import { graphql, useStaticQuery } from "gatsby"

import Icon from "../images/icon.inline.svg"
import Facebook from "../images/facebook.inline.svg"
import Instagram from "../images/instagram.inline.svg"
import { Query } from "../../graphql-types"

const Line = styled.hr`
  border: solid 1px #000;
`

const Wrapper = styled.div`
  padding-top: 65px;
  padding-bottom: 65px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    margin-bottom: 35px;
  }
  a {
    color: inherit;
    text-decoration: none;
    font-size: 24px;
    line-height: 29px;
  }
`

const Social = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  a {
    margin: 0 3px;
  }
  svg {
    height: 20px;
    margin-bottom: 0;
  }
`

const Footer: React.FC = () => {
  const { prismicContacto } = useStaticQuery<Query>(graphql`
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
        }
      }
    }
  `)

  const contact = prismicContacto?.data
  const phoneNumber = contact?.whatsapp?.text || ""
  const email = contact?.correo?.text || ""
  const fbUrl = contact?.facebook?.url || ""
  const igUrl = contact?.instagram?.url || ""

  return (
    <Container className="mt-5 pt-5">
      <Line />
      <Wrapper>
        <Icon />
        <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
          {email}
        </a>
        <a
          href={`https://wa.me/+52${phoneNumber.trim()}`}
          target="_blank"
          rel="noreferrer"
        >
          wa: {phoneNumber}
        </a>
        <Social>
          <a href={igUrl} target="_blank" rel="noreferrer">
            <Instagram />
          </a>
          <a href={fbUrl} target="_blank" rel="noreferrer">
            <Facebook />
          </a>
        </Social>
      </Wrapper>
    </Container>
  )
}

export default Footer
