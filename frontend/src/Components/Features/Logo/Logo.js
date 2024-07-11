import React, { useState } from 'react'

const Logo = () => {

    const [showLogo,setShowLogo]=useState(true)

   setTimeout(()=>{
    setShowLogo(false)
   },2000)





  return (
    <>
    {showLogo &&
        <div className='absolute'>
        <p>logo</p>
      </div>
    }
    </>
  )
}

export default Logo
