import React, { useState } from "react"
import styled from "styled-components"
import { RichText, RichTextBlock } from "prismic-reactjs"
import { Modal, Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"

import { PrismicImageFluidType } from "../../graphql-types"
import CloseSvg from "../images/close.inline.svg"

export interface ReviewProps {
  title: RichTextBlock[] | undefined
  shortText: RichTextBlock[] | undefined
  fullText: RichTextBlock[] | undefined
  image: PrismicImageFluidType | null | undefined
  imageAlt: string | undefined
}

const Wrapper = styled.div`
  h2 {
    font-size: 50px;
    line-height: 60px;
    &:last-of-type {
      margin-bottom: 24px;
    }
  }
  p {
    font-size: 18px;
    line-height: 26px;
    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
`

const Button = styled.button`
  background: transparent;
  border: none;
  border-bottom: solid 2px #000;
  font-family: "hv_museregular";
  font-size: 1.8rem;
`

const ModalContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.5rem;
  p {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`

const CloseBtn = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  width: 50px;
  top: 15px;
  right: 15px;
  svg {
    width: 100%;
    height: auto;
  }
`

const Review: React.FC<ReviewProps> = ({
  title,
  shortText,
  image,
  fullText,
  imageAlt,
}) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Wrapper className="d-flex flex-column h-100">
        <RichText render={title} />
        <RichText render={shortText} />
        <div className="text-md-right mt-auto pt-5">
          <Button
            onClick={() => {
              setShow(true)
            }}
          >
            MÁS
          </Button>
        </div>
      </Wrapper>
      <Modal
        show={show}
        onHide={() => {
          setShow(false)
        }}
        size="xl"
        centered
        scrollable
      >
        <Modal.Body>
          <CloseBtn
            onClick={() => {
              setShow(false)
            }}
          >
            <CloseSvg />
          </CloseBtn>
          <Container className="py-5">
            <Row>
              <Col md={6}>
                {image && <Img fluid={image} alt={imageAlt || ""} />}
              </Col>
              <Col md={6}>
                <RichText render={fullText} Component={ModalContent} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Review
