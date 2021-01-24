import React from "react"
import { RichText, RichTextBlock } from "prismic-reactjs"
import styled from "styled-components"
import { Container } from "react-bootstrap"

interface Props {
  quote: RichTextBlock[]
}

const Wrapper = styled.div`
  padding-top: 80px;
  padding-bottom: 40px;
  text-align: center;
  font-size: 24px;
  line-height: 28px;
`

const Quote = React.forwardRef<any, Props>(({ quote }, ref) => {
  return (
    <Container ref={ref}>
      <Wrapper>
        <RichText render={quote} />
      </Wrapper>
    </Container>
  )
})

Quote.displayName = "Quote"

export default Quote
