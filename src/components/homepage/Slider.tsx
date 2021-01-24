import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import { default as SlickSlider } from "react-slick"
import { PrismicImageFluidType } from "../../../graphql-types"

interface Props {
  slider: {
    url: string
    fluid: PrismicImageFluidType | undefined | null
    alt: string
  }[]
}

const Slide = styled.div`
  background-color: lightgray;
  position: relative;
  &:after {
    content: "";
    display: block;
    padding-top: 52%;
  }
`

const settings = {
  dots: false,
  arrows: false,
  autoplay: true,
  fade: true,
  pauseOnHover: false,
}

const Slider = React.forwardRef<any, Props>(({ slider }, ref) => {
  if (!slider) return null
  return (
    <div ref={ref}>
      <SlickSlider {...settings}>
        {slider.map(slide => (
          <Slide key={slide.url}>
            {slide.fluid && (
              <Img
                fluid={slide.fluid}
                alt={slide.alt || ""}
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
          </Slide>
        ))}
      </SlickSlider>
    </div>
  )
})

Slider.displayName = "Slider"

export default Slider
