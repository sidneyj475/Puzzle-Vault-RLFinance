import React from 'react'

function TimeKeep() {

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick');
    })
  })

  return (
    <div>{}</div>
  )
}

export default TimeKeep