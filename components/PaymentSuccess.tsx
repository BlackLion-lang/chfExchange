"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useEffect, useState } from "react"

interface PaymentSuccessProps {
  tokenAmount: string
  price: number
  txHash: string
  onContinue: () => void
}

export default function PaymentSuccess({ tokenAmount, price, txHash, onContinue }: PaymentSuccessProps) {

  const txUrl = `https://bscscan.com/tx/${txHash}`;
  return (
    <Card className="glass-card">
      <div className="text-center mb-3 sm:mb-4 hero-gradient rounded-2xl sm:rounded-3xl p-3 sm:p-4 glass-card">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 shadow-2xl shadow-primary/25">
            <img src="/chf-logo.png" alt="CHF.CH Logo" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-1 sm:mb-2 text-balance">
              CHF Exchange
            </h1>
            <p className="text-sm sm:text-lg text-foreground/90">Swiss Franc Stablecoin Trading Platform</p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 max-w-2xl mx-auto text-pretty">
          Trade CHF with BNB USDT. Backed by Swiss precision, stability, and regulatory compliance.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:gap-3 max-w-sm sm:max-w-md mx-auto">
          {/* <div className="text-center bg-card/90 backdrop-blur-md border border-border p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl">
            <div className="text-lg sm:text-2xl font-bold text-card-foreground">totalUsers</div>
            <p className="text-card-foreground/80 text-xs sm:text-sm">Active Users</p>
          </div> */}
        </div>
      </div>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-green-400">Payment Successful!</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-foreground/80">Your payment has been processed successfully.</p>
        <div className="bg-card/50 p-4 rounded-lg">
          <p className="text-sm text-foreground/70 mb-1">CHF Purchased:</p>
          <p className="text-2xl font-bold text-green-400">{(Number(tokenAmount) * price).toFixed(2)} CHF</p>
        </div>
        <p className="text-sm text-foreground/60">Your CHF sent to your connected wallet. Please check.</p>
         {/* Dynamic Transaction Link */}
        {txUrl  && (
          <a
            href={txUrl }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on block explorer : https://bscscan.com/tx/{txUrl.replace("https://bscscan.com/tx/", "").slice(0, 6)}...{txUrl.slice(-4)}
          </a>
        )}
        <Button onClick={onContinue} className="w-full">
          Continue Trading
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
