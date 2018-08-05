import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import airplane from '../assets/airplane-shape.png'
import '../assets/style.css'

export default class PlaneButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlane: false,
      showError: false
    }
  }

  componentDidMount() {
    const { formContent } = this.props
    if (formContent.length >=5) this.setState({ showPlane: true })
  }

  componentDidUpdate(prevProps, prevState) {
    const { formContent, error } = this.props
    const { showPlane, submitting, showError } = this.state

    if (!showPlane && !submitting && formContent.length >= 5)
      this.setState({ showPlane: true })

    if (showPlane && formContent.length < 5) this.setState({ showPlane: false })

    if (error && !prevProps.error) {
      this.setState({ showError: true })
      setTimeout(() => this.setState({ showError: false }), 2000)
    }
  }

  componentWillUnmount() {
    this.setState({ showPlane: false })
  }

  render() {
    const { showPlane, showError } = this.state
    const { loadingMessage, submitFlightCode, error } = this.props

    return(
      <div id="button">
        {showError ? error : ""}
        <h2>{loadingMessage}</h2>
        <CSSTransition
          in={showPlane && !loadingMessage && !showError}
          timeout={2000}
          classNames="plane"
          mountOnEnter
          unmountOnExit
        >{state => (
          <div>
            <img
              src={airplane}
              onClick={submitFlightCode}
              id="plane"
            />
          </div>
        )}</CSSTransition>
      </div>
    )
  }
}
