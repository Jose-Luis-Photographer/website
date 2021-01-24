import React from "react"
import styled from "styled-components"

const StyledContainer = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  margin: auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`

const Container: React.FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>
}

export default Container
