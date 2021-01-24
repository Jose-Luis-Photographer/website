import React from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"

import Review, { ReviewProps } from "../Review"

interface Quote extends ReviewProps {
  id: string
}

interface Props {
  quotes: Quote[]
}

const Wrapper = styled.div`
  margin-top: 120px;
`

const QuoteGrid: React.FC<Props> = ({ quotes }) => {
  return (
    <>
      <Wrapper>
        <Container>
          <Row>
            {quotes.map(quote => (
              <Col key={quote.id} md={4}>
                <Review
                  title={quote.title}
                  shortText={quote.shortText}
                  fullText={quote.fullText}
                  image={quote.image}
                  imageAlt={quote.imageAlt}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Wrapper>
    </>
  )
}

export default QuoteGrid
