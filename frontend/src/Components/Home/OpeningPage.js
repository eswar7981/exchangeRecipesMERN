import React from 'react'

import bgVideo from "../images/bg.mp4";
import { useNavigate } from 'react-router-dom';

const OpeningPage = () => {
 const navigate=useNavigate()

  const submitHandler=(e)=>{
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div>
      <div className="video">
        <video
          style={{ marginTop: "50px" }}
          className="max-w-max mx-auto mt-5"
          src={bgVideo}
          autoPlay
          loop
          muted
        />
        <div className="content">
          <h3 style={{ fontSize: "40px", fontWeight: "bold" }}>
            Discover Quick & Easy Recipes
          </h3>
          <button  onClick={submitHandler} style={{ backgroundColor: "green" }}>Explore</button>
        </div>
      </div>
    </div>
  )
}

export default OpeningPage
