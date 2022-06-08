import { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = (props) => {
  const [visibility, setVisibility] = useState(false)
  const displayMeWhenVisible = { display: visibility ? '' : 'none' }
  const displayMeWhenHidden = { display: visibility ? 'none' : '' }

  return (
    <div>
      <div style={displayMeWhenHidden}>
        <button onClick={() => setVisibility(!visibility)}>
          {props.displayButtonName}
        </button>
      </div>
      <div style={displayMeWhenVisible}>
        {props.children}
        <button onClick={() => setVisibility(!visibility)}>
          {props.hideButtonName}
        </button>
      </div>
    </div>
  )
}

Toggleable.propTypes = {
  displayButtonName: PropTypes.string.isRequired,
  hideButtonName: PropTypes.string.isRequired,
}

export default Toggleable