import React from "react"
import { Link } from "react-router-dom"
import Heading from "../../../components/common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero sm:pt-[40%] md:pt-[32%] lg:pt-[20%]'>
        <div className='container px-10 mt-0 xl:mt-10'>
          <div className='row'>
            <Heading subtitle='Chào mừng đến E-Academy' title='Hệ thống giảng dạy Tiếng Anh online' />
            <p>Tự hào là hệ thống số 1 Việt Nam trong lĩnh vực giảng dạy và đào tạo Tiếng Anh chuyên sâu.</p>
            <div className='button'>
              <Link to={'/courses'}>
              <button className='primary-btn button__custom z-[100]'>
                KHÁM PHÁ NGAY <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              </Link>
              <button>
                XEM KHÓA HỌC <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin md:mt-[740px]'></div>
    </>
  )
}

export default Hero
