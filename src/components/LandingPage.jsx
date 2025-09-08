"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { CONTRACTS, ABIS } from "../constant/constant"
import { Button } from "./ui/button"
import { IoCopyOutline } from 'react-icons/io5'
import { formatUnits, parseUnits } from "viem"
import CreditCardPayment from "../../components/CreditCardPayment"
import PaymentSuccess from "../../components/PaymentSuccess"

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const { address, isConnected } = useAccount()
  const [amount, setAmount] = useState("")
  const [mode, setMode] = useState("buy")
  const [balanceUSDT, setBalanceUSDT] = useState("0")
  const [balanceCHF, setBalanceCHF] = useState("0")
  const [chfPrice, setCHFPrice] = useState("0")
  const [EurPrice, setEURPrice] = useState("0")
  const [showPayment, setShowPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [purchasedTokens, setPurchasedTokens] = useState("")
  const [txHash, setTxHash] = useState("")
  const [paymentError, setPaymentError] = useState("")
  const slippagePercent = 1

  // --- Read balances ---
  const { data: usdtBalance } = useReadContract({
    address: CONTRACTS.USDT_ADDRESS,
    abi: ABIS.USDT,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    watch: true,
    query: { enabled: !!address },
  })

  const { data: chfBalance } = useReadContract({
    address: CONTRACTS.chfToken_ADDRESS,
    abi: ABIS.chfToken,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    watch: true,
    query: { enabled: !!address },
  })

  const { data: chfToUsd } = useReadContract({
    address: CONTRACTS.chfBuyContract_ADDRESS,
    abi: ABIS.chfBuyContract,
    functionName: "getCHFUSDPrice",
    watch: true,
  })

  const { data: EurToUsd } = useReadContract({
    address: CONTRACTS.chfBuyContract_ADDRESS,
    abi: ABIS.chfBuyContract,
    functionName: "getEURUSDPrice",
    watch: true,
  })

  const { data: isApproved } = useReadContract({
    address: CONTRACTS.chfBuyContract_ADDRESS,
    abi: ABIS.chfBuyContract,
    functionName: "isApproved",
    args: address ? [address] : undefined,
    watch: true,
  })

  useEffect(() => {
    if (usdtBalance) setBalanceUSDT(formatUnits(usdtBalance, 18))
    if (chfBalance) setBalanceCHF(formatUnits(chfBalance, 18))
    if (chfToUsd) setCHFPrice(formatUnits(chfToUsd, 8))
    if (EurToUsd) setEURPrice(formatUnits(EurToUsd, 8))
  }, [usdtBalance, chfBalance, chfToUsd, EurToUsd])

  const { writeContract: write } = useWriteContract()

  const EurToChf = EurPrice / chfPrice

  // --- Buy ---
  const handleApproveBuy = async () => {
    if (!amount) return
    await write({
      address: CONTRACTS.USDT_ADDRESS,
      abi: ABIS.USDT,
      functionName: "approve",
      args: [CONTRACTS.chfBuyContract_ADDRESS, parseUnits(amount, 18)],
    })
  }

  const handleBuy = async () => {
    await write({
      address: CONTRACTS.chfBuyContract_ADDRESS,
      abi: ABIS.chfBuyContract,
      functionName: "buy",
      args: [parseUnits(amount, 18)],
    })
  }

  // --- Sell ---
  const handleApproveSell = async () => {
    if (!amount) return
    await write({
      address: CONTRACTS.chfToken_ADDRESS,
      abi: ABIS.chfToken,
      functionName: "approve",
      args: [CONTRACTS.chfBuyContract_ADDRESS, parseUnits(amount, 18)],
    })
  }

  const handleSell = async () => {
    if (!isApproved) {
      setPaymentError("❌ Your account is not approved to sell yet.")
      return
    }
    await write({
      address: CONTRACTS.chfBuyContract_ADDRESS,
      abi: ABIS.chfBuyContract,
      functionName: "sell",
      args: [parseUnits(amount, 18)],
    })
  }

  const handleSubmit = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return
    try {
      await write({
        address: CONTRACTS.chfBuyContract_ADDRESS,
        abi: ABIS.chfBuyContract,
        functionName: "submitRequest",
      })
      console.log("✅ Sell request submitted")
    } catch (err) {
      console.error("❌ Submit failed:", err)
    }
  }

  // --- Euro Payments ---
  const handleEuroPayment = () => {
    if (!amount) return
    setPaymentError("")
    setShowPayment(true)
  }

  const handlePaymentSuccess = (tokenAmount, txHash) => {
    setPurchasedTokens(tokenAmount)
    setTxHash(txHash)
    setPaymentSuccess(true)
    setShowPayment(false)
  }

  const handlePaymentError = (error) => {
    setPaymentError(error)
    setShowPayment(false)
  }

  const handleContinueTrading = () => {
    setPaymentSuccess(false)
    setAmount("")
    setPurchasedTokens("")
    setPaymentError("")
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText("0x6975543aa89f11781be639c9af052a4ceddf03cc")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // --- UI ---
  if (paymentSuccess) {
    return (
      <div className="max-w-screen-lg mx-auto bg-black/40 rounded-2xl shadow-lg p-6">
        <PaymentSuccess tokenAmount={purchasedTokens} price={EurToChf} txHash={txHash} onContinue={handleContinueTrading} />
      </div>
    )
  }

  if (showPayment && mode === "buyWithEuro") {
    return (
      <div className="max-w-screen-lg mx-auto bg-black/40 rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Complete Your Purchase</h2>
          <Button variant="outline" onClick={() => setShowPayment(false)} className="text-sm">
            Back to Exchange
          </Button>
        </div>
        <CreditCardPayment amount={amount} price={EurToChf} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
      </div>
    )
  }

  return (
    <div className="max-w-screen-lg mx-auto bg-black/40 rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-3 sm:mb-4 hero-gradient rounded-2xl sm:rounded-3xl p-3 sm:p-4 ">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 shadow-2xl shadow-primary/25">
            <img src="/chf-logo.png" alt="CHF.CH Logo" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-1 sm:mb-2">
              CHF Exchange
            </h1>
            <p className="text-sm sm:text-lg text-foreground/90">Swiss Franc Stablecoin Trading Platform</p>
          </div>
        </div>
        <div className="border border-black shadow-lg shadow-black text-xl sm:text-2xl text-foreground/80 mb-4 px-8 sm:mb-6 max-w-xl mx-auto text-pretty">
          <span className="w-full">Contract Address : 0x69...03cc </span>
          <button onClick={handleCopy}><IoCopyOutline /></button>
          {copied && <span className="text-sm text-green-600">Copied!</span>}
        </div>
      </div>

      {/* Balances */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-sm sm:max-w-md mx-auto mb-6">
        <div className="text-center bg-card/90 border p-2 rounded-xl shadow-xl">
          <div className="text-lg font-bold">CHF Balance</div>
          <p className="text-sm">{Number(balanceCHF).toFixed(2)} CHF</p>
        </div>
        <div className="text-center bg-card/90 border p-2 rounded-xl shadow-xl">
          <div className="text-lg font-bold">CHF/USD 1 CHF</div>
          <p className="text-sm">{(chfPrice / 1e10).toFixed(2)} USD</p>
        </div>
        <div className="text-center bg-card/90 border p-2 rounded-xl shadow-xl">
          <div className="text-lg font-bold">EUR/CHF 1 EUR</div>
          <p className="text-sm">{(EurToChf).toFixed(2)} CHF</p>
        </div>
      </div>

      {/* Tabs */}
      <h2 className="text-xl font-bold mb-4">Instant Exchange</h2>
      <div className="flex justify-center mb-6">
        <Button onClick={() => setMode("buy")} className={`w-1/2 ${mode === "buy" ? "bg-blue-600" : "bg-gray-700"}`}>
          Buy CHF with USDT
        </Button>
        <Button onClick={() => setMode("sell")} className={`w-1/2 ${mode === "sell" ? "bg-red-600" : "bg-gray-700"}`}>
          Sell CHF
        </Button>
      </div>

      {/* Amount Inputs */}
      <div>
        <label className="text-sm text-gray-300">
          From ({mode === "buy" ? "USDT" : "CHF"})
        </label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white mt-1"
        />
        <p className="text-xs text-gray-400 mt-1">
          Balance: {mode === "buy" ? balanceUSDT : Number(balanceCHF).toFixed(2)} {mode === "buy" ? "USDT" : "CHF"}
        </p>
      </div>

      <div>
        <label className="text-sm text-gray-300">
          To ({mode === "sell" ? "USDT" : "CHF"})
        </label>
        <input
          type="text"
          disabled
          value={
            mode === "buy"
              ? (amount / (chfPrice / 1e10)).toFixed(2)
              : (amount * chfPrice / 1e10).toFixed(2)
          }
          className="w-full p-3 rounded-lg bg-gray-800 text-gray-400 mt-1"
        />
      </div>

      {/* Errors */}
      {paymentError && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">{paymentError}</p>
        </div>
      )}

      {/* Buttons */}
      {isConnected ? (
        <div className="flex flex-col gap-3">
          {mode === "buy" && (
            <div className="flex gap-3">
              <Button onClick={handleApproveBuy} className="w-1/2 bg-blue-600 hover:bg-blue-500" disabled={!amount}>
                Approve USDT
              </Button>
              <Button onClick={handleBuy} className="w-1/2 bg-blue-600 hover:bg-blue-500" disabled={!amount}>
                Buy CHF
              </Button>
            </div>
          )}

          {mode === "sell" && (
            <>
              {!isApproved ? (
                <>
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-red-600 hover:bg-red-500"
                    disabled={!amount}
                  >
                    Submit Sell Request
                  </Button>
                  <p className="text-xs text-gray-400 text-center mt-1">⏳ Waiting for admin approval...</p>
                </>
              ) : (
                <div className="flex gap-3">
                  <Button onClick={handleApproveSell} className="w-1/2 bg-red-600 hover:bg-red-500" disabled={!amount}>
                    Approve CHF
                  </Button>
                  <Button onClick={handleSell} className="w-1/2 bg-red-600 hover:bg-red-500" disabled={!amount}>
                    Sell CHF
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-400">Please connect wallet above</p>
      )}
    </div>
  )
}
