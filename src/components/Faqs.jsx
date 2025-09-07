import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import './faqs.css'


const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is CHF?',
      answer: 'CHF is a digital stablecoin designed to mirror the value of the Swiss Franc (CHF) on the blockchain. For every CHF issued, there is an equivalent CHF held in secure reserves, ensuring price stability and trust.'
    },
    {
      question: 'Why Swiss Franc?',
      answer:
        'The Swiss Franc is known globally as a safe-haven currency, trusted for decades due to Switzerland’s financial stability and independence. By tokenizing CHF, we bring that same reliability to digital assets.'
    },
    {
      question: 'How does CHF stay pegged to CHF?',
      answer: 'Each CHF token is backed 1:1 by Swiss Franc reserves held with regulated partners.'
    },
    // {
    //   question: 'Can I redeem CHF.CH for Swiss Francs?',
    //   answer: 'No, Lipepe is not a real token; it’s used here as an example.'
    // },
    {
      question: 'How safe is my money?',
      answer: 'Reserves are regularly audited, smart contracts are independently verified, and our system is built with security first.'
    },
    {
      question: 'Is it safe for institutional holdings?',
      answer: 'Absolutely. Funds are fully collateralized, compliant with Swiss regulation, and secured through audited smart contracts.'
    }
  ]

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div >
      <div className=" text-xl font-bold mb-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase text-white">Frequently asked questions</h3>
        <div className="faq-items">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-icon-cont">
                  {openIndex === index ? (
                    <FaMinus className="faq-icon" fill="#000000" />
                  ) : (
                    <FaPlus className="faq-icon" fill="#000000" />
                  )}
                </span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faqs
