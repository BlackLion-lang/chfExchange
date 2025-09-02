import React from 'react'
import imgHowToOne from '../../public/how-to-1.svg'
import imgHowToTwo from '../../public/how-to-2.svg'
import imgHowToThree from '../../public/how-to-3.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Autoplay } from 'swiper/modules'

const howToBuyData = [
  {
    id: '01',
    // image: imgHowToOne,
    title: 'Buy with USDT',
    href: '',
    bg: '#D1F4FF',
    description:
      'Convert your USDT directly into CHF.CH at real-time rates. Simply connect your wallet, choose the amount of USDT you want to spend, and receive CHF.CH instantly into your account. Fast, secure, and on-chain'
  },
  {
    id: '02',
    // image: imgHowToTwo,
    title: 'Buy with CARD',
    href: '',
    bg: '#D3D5FF',
    description:
      'Purchase CHF.CH using your debit or credit card. Enter the amount in €, complete the secure payment, and CHF.CH will be credited to your wallet within minutes. Perfect for users without crypto.'
  },
  {
    id: '03',
    // image: imgHowToThree,
    title: 'Sell CHF.CH',
    href: '',
    bg: '#FFFDCF',
    description:
      'Want to sell CHF.CH? Exchange your CHF.CH back into USDT. Just select how much CHF.CH you want to sell, confirm the transaction, and receive your funds instantly.'
  }
]

const HowToBuy = () => {
  return (
    <div className="w-full pt-12 pb-5 relative">
      <div className="mt-[-80px]">
        {' '}
      </div>
      <div className="px-4">
        <div className="pt-32 pb-3 md:pb-3">
          <h2 className="uppercase text-[30px] md:text-[40px] font-sourGummy font-weight: 600 line-height: 110px text-center pb-10">
            How to Exchange
          </h2>
        </div>
        {/* <img
          src={treeRight}
          alt="tree"
          className="absolute top-[140px] right-0 w-[200px] md:w-auto"
        /> */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1300px] w-full mx-auto gap-20 md:gap-8 py-6">
          {howToBuyData.map(item => (
            <div
              key={item.id}
              className={`relative flex flex-col items-center justify-center px-4 pt-4 pb-4 rounded-xl border-2 border-dashed font-sourGummy`}
            >
              <div className="text-[32px] text-[#E3FF10] size-[80px] border-2 border-dashed rounded-full flex items-center justify-center absolute top-[-50px] left-[50px] bg-black">
                {item.id}
              </div>
              <h3 className="text-[24px] font-bold">{item.title}</h3>
              <p className="text-[18px] text-center">
                {item.description}{' '}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowToBuy
