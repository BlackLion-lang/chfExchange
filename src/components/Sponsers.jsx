import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Autoplay } from 'swiper/modules'

import img1 from '../../assets/landing/sponser-1.png'
import img2 from '../../assets/landing/sponser-2.png'

const images = [img1, img2, img1, img2, img1, img2]

const Sponsers = () => (
  <div className="w-full overflow-hidden py-3 sm:py-4 md:py-6 bg-[#000000]">
    <Swiper
      modules={[Autoplay]}
      slidesPerView={2}
      spaceBetween={10}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20
        }
      }}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }}
      speed={7000}
      allowTouchMove={false}
      className="w-full"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={img}
            alt={`marquee-img-${idx}`}
            className="h-5 sm:h-8 md:h-7 xl:h-11 w-auto object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)

export default Sponsers
