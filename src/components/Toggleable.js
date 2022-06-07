import { useState, useEffect } from 'react'

const Toggleable = (props) => {
  const [visibility, setVisibility] = useState(false)
  const displayMeWhenVisible = { display: visibility ? '' : 'none' }
  const displayMeWhenHidden = {display: visibility ? 'none' : '' }
  

  return (
    <div>
      <div style={displayMeWhenHidden}> 
        <button onClick={() => setVisibility(!visibility)}>
          {props.buttonName}
        </button>
      </div>
      <div style={displayMeWhenVisible}>
        {props.children}
        <button onClick={() => setVisibility(!visibility)}>
          cancel
        </button>
      </div>
    </div>
  ) 
}

export default Toggleable