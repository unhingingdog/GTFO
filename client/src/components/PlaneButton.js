import React from 'react'
import airplane from '../assets/airplane-shape.svg'

export default ({ formContent, submitFlightCode }) => {
  return(
    <div id="button">
      {(formContent.length >= 5) &&
        <img
          src={airplane}
          id="plane-icon"
          onClick={submitFlightCode}
        />
      }
    </div>
  )
}
