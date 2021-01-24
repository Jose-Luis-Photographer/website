import React from "react"
import styled from "styled-components"

interface Props {
  alignItems?: "flex-start" | "flex-end" | "center"
  justifyContent?: "flex-start" | "center"
}

const StyledRow = styled.div<Props>`
  margin-left: -30px;
  margin-right: -30px;
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => props?.alignItems || "flex-start"};
  justify-content: ${props => props?.justifyContent || "flex-start"};
`

const Row: React.FC = ({ children, ...props }) => {
  return <StyledRow {...props}>{children}</StyledRow>
}

export default Row
