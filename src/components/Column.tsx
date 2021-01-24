import React from "react"
import styled from "styled-components"

interface Props {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

const StyledColumn = styled.div<Props>`
  padding-left: 15px;
  padding-right: 15px;
  width: ${props => (props.xs ? `${(props.xs / 12) * 100}%` : "100%")};
  ${props =>
    props.sm &&
    `@media (min-width: 768px) {
          width: ${(props.sm / 12) * 100}%;
      }`}
  ${props =>
    props.md &&
    `@media (min-width: 992px) {
          width: ${(props.md / 12) * 100}%;
      }`}
  ${props =>
    props.lg &&
    `@media (min-width: 1200px) {
          width: ${(props.lg / 12) * 100}%;
      }`}
  ${props =>
    props.xl &&
    `@media (min-width: 1400px) {
          width: ${(props.xl / 12) * 100}%;
      }`}
`

const Column: React.FC<Props> = ({ children, ...props }) => {
  return <StyledColumn {...props}>{children}</StyledColumn>
}

export default Column
