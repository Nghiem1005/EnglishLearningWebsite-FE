import React, { useRef, useState } from "react"
import { faq } from "../../dummydata"
import Heading from "../../components/common/heading/Heading"

const Faq = () => {
  const [click, setClick] = useState(false)

  const toggle = (index) => {
    if (click === index) {
      return setClick(null)
    }
    setClick(index)
  }

  return (
    <>
      <Heading subtitle='FAQS' title='Frequesntly Ask Question' />
      <section className='faq'>
        <div className='container'>
          {faq.map((val, index) => (
            <div className='box' key={index}>
              <button className='accordion' 
                onClick={() => toggle(index)} key={index}
                style={{ backgroundColor: click === index ? '#1eb2a6': '#fff', color: click === index ? '#fff': '#000'}}
              >
                <h2>{val.title}</h2>
                <span>{click === index ? <i className='fa fa-chevron-down'></i> : <i className='fa fa-chevron-right'></i>}</span>
              </button>
              {click === index ? (
                <div className='text'>
                  <p>{val.desc}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Faq
