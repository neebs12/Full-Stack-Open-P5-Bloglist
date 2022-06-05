const FlashMessage = ({
  isError, 
  flashMsg, setFlashMsg
}) => {
  let color = isError ? 'red' : 'green'
  const myComponentStyle = {
    color: color,
    fontSize: '1.5rem',
    backgroundColor: '#bababa',
    border: `3px solid ${color}`,
    borderRadius: '10px',
    padding: '10px'
  }

  if (flashMsg === '') {
    return (<div></div>)
  } else {
    // flash message persists for 5 seconds
    setTimeout(() => setFlashMsg(''), 5000) 
    return (
      <div style={myComponentStyle}>
        {flashMsg}
      </div>
    )
  }
}

export default FlashMessage