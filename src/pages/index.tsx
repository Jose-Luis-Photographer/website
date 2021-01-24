import React, { useRef, useEffect, useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Header, { Section } from "../components/Header"
import Slider from "../components/homepage/Slider"
import Quote from "../components/homepage/Quote"
import PortfolioGrid from "../components/homepage/PortfolioGrid"
import QuoteGrid from "../components/homepage/QuoteGrid"
import {
  PrismicHomepageConnection,
  PrismicResenasConnection,
} from "../../graphql-types"

interface Props {
  data: {
    allPrismicHomepage: PrismicHomepageConnection
    allPrismicResenas: PrismicResenasConnection
  }
}

export const query = graphql`
  {
    allPrismicHomepage {
      nodes {
        data {
          slider {
            image {
              alt
              url
              fluid {
                ...GatsbyPrismicImageFluid
              }
            }
          }
          quote {
            raw
          }
        }
      }
    }
    allPrismicResenas(limit: 3) {
      nodes {
        id
        data {
          title {
            raw
          }
          short_text {
            raw
          }
          resena_completa {
            raw
          }
          imagen_novios {
            alt
            fluid {
              ...GatsbyPrismicImageFluid
            }
          }
        }
      }
    }
  }
`

const IndexPage: React.FC<Props> = ({ data }) => {
  const homepageData = {
    slider: data.allPrismicHomepage.nodes[0].data?.slider?.map(slide => ({
      url: slide?.image?.url || "",
      fluid: slide?.image?.fluid,
      alt: slide?.image?.alt || "",
    })),
    quote: data.allPrismicHomepage.nodes[0].data?.quote?.raw,
    quoteGrid: data.allPrismicResenas.nodes.map(node => ({
      id: node.id,
      title: node.data?.title?.raw,
      shortText: node.data?.short_text?.raw,
      fullText: node.data?.resena_completa?.raw,
      image: node.data?.imagen_novios?.fluid,
      imageAlt: node.data?.imagen_novios?.alt || "",
    })),
  }
  const [sections, setSections] = useState<Section[]>([])
  const quoteSection = useRef<null | HTMLElement>(null)
  const sliderSection = useRef<null | HTMLElement>(null)

  useEffect(() => {
    const quoteSectionTop = quoteSection.current?.offsetTop || 0
    const quoteSectionHeight = quoteSection.current?.clientHeight || 0
    const sliderSectionTop = sliderSection.current?.offsetTop || 0
    const sliderSectionHeight = sliderSection.current?.clientHeight || 0
    setSections([
      {
        color: "light",
        offsetTop: sliderSectionTop,
        offsetBottom: sliderSectionTop + sliderSectionHeight,
      },
      {
        color: "dark",
        offsetTop: quoteSectionTop,
        offsetBottom: quoteSectionTop + quoteSectionHeight,
      },
    ])
  }, [quoteSection, sliderSection])

  return (
    <Layout>
      <Header sections={sections} />
      {homepageData.slider && (
        <Slider slider={homepageData.slider} ref={sliderSection} />
      )}
      <Quote quote={homepageData.quote} ref={quoteSection} />
      <PortfolioGrid />
      <QuoteGrid quotes={homepageData.quoteGrid || []} />
    </Layout>
  )
}

export default IndexPage
