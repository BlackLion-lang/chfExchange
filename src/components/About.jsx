import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Autoplay } from 'swiper/modules'
import { FaShieldAlt, FaRegClock, FaGlobe, FaFlagCheckered } from 'react-icons/fa'

const About = () => {
    const sections = [
        {
            title: 'About Our CHF Stablecoin',
            content: [
                'Our CHF stablecoin is a digital representation of the Swiss Franc, combining the reliability of traditional banking with the efficiency and innovation of blockchain technology.',
                'Stable Value: Always 1:1 with CHF, backed by fully audited reserves.',
                'Digital Native: Works seamlessly with wallets, exchanges, and DeFi apps.',
                'Regulated & Transparent: Issued and managed under strict Swiss or Liechtenstein regulatory frameworks.',
            ],
            icon: <FaRegClock className="text-[#00BFFF] w-8 h-8" />
        },
        {
            title: 'Security & Trust',
            content: [
                'Full Reserve Backing: Each CHF stablecoin is backed 1:1 by CHF in regulated Swiss/Liechtenstein banks.',
                'Audits & Transparency: Monthly proof-of-reserve audits are published for public verification.',
                'Smart Contract Security: Contracts are independently audited to ensure safe token minting, redemption, and transfers.',
                'Redemption Guarantee: Users can convert digital CHF back into fiat anytime without delays.'
            ],
            icon: <FaShieldAlt className="text-[#00BFFF] w-8 h-8" />
        },
        {
            title: 'Future of CHF Digital Currency',
            content: [
                'CBDC Integration: Potential future integration with a Swiss Central Bank Digital Franc.',
                'Global Payments Adoption: Businesses and e-commerce platforms increasingly accepting CHF stablecoins.',
                'Smart Contracts & Automation: Recurring payments, automated settlements, and programmable finance in CHF.',
                'Cross-Chain Expansion: Multi-chain support increases liquidity, usability, and adoption.'
            ],
            icon: <FaGlobe className="text-[#00BFFF] w-8 h-8" />
        }
    ]

    const roadmap = [
        { phase: 'Phase 1', timeline: 'Q1 2025', milestones: ['Concept design', 'Regulatory approval', 'Smart contract development'] },
        { phase: 'Phase 2', timeline: 'Q2 2025', milestones: ['Launch on Binance'] },
        { phase: 'Phase 3', timeline: 'Q3 2025', milestones: ['Mobile wallet integration', 'Exchange listings', 'Merchant partnerships'] },
        { phase: 'Phase 4', timeline: 'Q4 2025', milestones: ['Cross-chain expansion', 'DeFi integration', 'Audit publication'] },
        { phase: 'Phase 5', timeline: '2026+', milestones: ['CBDC interoperability', 'Global adoption initiatives'] },
    ]

    return (
        <div className="w-full py-16 ">
            <div className="max-w-[1300px] mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase text-white">
                    CHF Stablecoin Overview
                </h2>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-10">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="mb-4">{section.icon}</div>
                            <h3 className="text-2xl font-semibold mb-4 text-black">{section.title}</h3>
                            <ul className="text-gray-900 text-left space-y-2 list-disc list-inside">
                                {section.content.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Mobile Swiper */}
                <div className="md:hidden mb-16">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                    >
                        {sections.map((section, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                                    <div className="mb-4 justify-center mx-auto">{section.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-black">{section.title}</h3>
                                    <ul className="text-gray-800 text-left space-y-1 list-disc list-inside">
                                        {section.content.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Roadmap Section */}
                <div className="mt-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase text-white">
                        Roadmap
                    </h2>

                    <div className="grid md:grid-cols-5 gap-6">
                        {roadmap.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                                <FaFlagCheckered className="mx-auto text-[#00BFFF] w-8 h-8 mb-3" />
                                <h3 className="text-xl font-semibold mb-2 text-black">{item.phase}</h3>
                                <p className="text-gray-600 font-medium mb-2">{item.timeline}</p>
                                <ul className="text-gray-800 text-left list-disc list-inside space-y-1">
                                    {item.milestones.map((milestone, i) => (
                                        <li key={i}>{milestone}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
