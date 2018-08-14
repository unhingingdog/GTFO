import React from 'react'

const fitFormTextSize = (text, isMobile) => {
  if (isMobile) {
    if (text.length > 5) return 77 - ((text.length - 5) * 10)
    return 77
  }
  if (text.length > 5) return 180 - ((text.length - 5) * 10)
  return 180
}

export default ({ formContent, handleFormSubmit, handleChange, isMobile }) => {
  return(
    <div id="form-container">
      <form onSubmit={handleFormSubmit} id="form">
        <input
          type="text"
          value={formContent}
          placeholder="EG123"
          maxLength="8"
          onChange={event => handleChange(event)}
          style={{
            fontSize: fitFormTextSize(formContent, isMobile),
          }}
          id="input"
        />
      </form>
    </div>
  )
}
