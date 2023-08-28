import React from "react"
import Heading from "../../components/common/heading/Heading"
import "./about.css"
import { homeAbout } from "../../dummydata"
import Awrapper from "./Awrapper"

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./images/about.webp' alt='' />
          </div>
          <div className='right row px-[40] py-[20px] xl:px-[80px] xl:py-[50px]'>
            <Heading subtitle='HỌC MỌI THỨ' title='Lợi ích khi học' />
            <div className='items'>
              {homeAbout.map((val, index) => {
                return (
                  <div className='item flexSB' key={index}>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard
