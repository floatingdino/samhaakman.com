import React, { Component } from "react"
import Img from "gatsby-image"

// TODO: Only unhide after load event
export default class Image extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }

    this.tag = React.createRef()
  }

  componentDidMount() {
    if (!!window.IntersectionObserver && this.tag.current) {
      this.observer = new IntersectionObserver(
        entries => this.handleObserver(entries),
        {
          rootMargin: "80px",
        }
      )

      this.observer.observe(this.tag.current)
    } else {
      // Abandon lazy-loading for browsers without IntersectionObserver
      this.setState({
        visible: true,
      })
    }
  }

  handleObserver(entries) {
    if (this.state.visible || !entries) {
      return
    }
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        this.setState({
          visible: true,
        })
      }
    })
  }

  render() {
    const { sharp, image, className } = this.props
    const { visible } = this.state
    return (
      <>
        {(sharp && sharp.childImageSharp && sharp.childImageSharp.fluid && (
          <Img
            fluid={sharp.childImageSharp.fluid}
            alt={image.alt}
            style={{ display: "block" }}
            {...this.props}
          />
        )) ||
          (sharp && sharp.childImageSharp && sharp.childImageSharp.fixed && (
            <Img
              fixed={sharp.childImageSharp.fixed}
              alt={image.alt}
              style={{ display: "block" }}
              className={className}
            />
          )) || (
            <>
              <img
                src={(visible && image.url) || ""}
                alt={image.alt}
                ref={this.tag}
                style={{
                  display: "block",
                  height: (!visible && image.dimensions.height) || null,
                  width: (!visible && image.dimensions.width) || null,
                  opacity: (!visible && 0) || null,
                  transition: "opacity 0.3s",
                  position: (!visible && "absolute") || null,
                }}
                className={className}
              />
              <noscript>
                <img src={image.url} alt={image.alt} className={className} />
              </noscript>
            </>
          )}
      </>
    )
  }
}
