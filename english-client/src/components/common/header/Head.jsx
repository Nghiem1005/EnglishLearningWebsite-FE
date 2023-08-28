import React from "react"

const Head = () => {
  return (
    <>
      <section className='head px-2 bg-[#1eb2a6]'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1 className="text-[20px] font-bold md:text-[35px]">E-ACADEMY</h1>
            <span className="hidden md:block">ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
