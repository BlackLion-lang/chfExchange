import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { ethers } from "ethers"
import CHFVaultAbi from "@/src/constant/chfBuyContract.json" // ABI of your vault/CHF contract
import { CONTRACTS, ABIS } from "@/src/constant/constant"



// --- Blockchain setup ---
const provider = new ethers.JsonRpcProvider(process.env.BSC_RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
const vaultContract = new ethers.Contract(CONTRACTS.chfBuyContract_ADDRESS!, CHFVaultAbi, wallet)

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, userWallet } = await request.json()

    if (!userWallet || !ethers.isAddress(userWallet)) {
      return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 })
    }

    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment intent ID is required" }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      // 1. Send CHF tokens to user's wallet
      // 2. Record transaction in database
      // 3. Send confirmation email

      const tokenAmount = paymentIntent.metadata.token_amount

      console.log(`[v0] Payment successful: ${paymentIntentId}, Amount: ${tokenAmount} CHF`)

      // --- Send CHF tokens on-chain ---
      try {
        const tx = await vaultContract.send(userWallet, ethers.parseUnits(tokenAmount, 18))
        await tx.wait()
        console.log(`✅ Sent ${tokenAmount} CHF to ${userWallet}, tx: ${tx.hash}`)

        return NextResponse.json({
          success: true,
          tokenAmount,
          transactionId: paymentIntentId,
          txHash: tx.hash,
          message: "Payment successful! CHF tokens sent to your wallet.",
        })
      } catch (err) {
        console.error("❌ Token transfer failed:", err)
        return NextResponse.json({ error: "Payment succeeded, but token transfer failed" }, { status: 500 })
      }
    }


    if (paymentIntent.status === "requires_payment_method") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment method was declined. Please try a different card.",
        },
        { status: 400 },
      )
    }

    if (paymentIntent.status === "canceled") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment was canceled.",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: `Payment status: ${paymentIntent.status}. Please try again.`,
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Error confirming payment:", error)

    if (error instanceof Error) {
      if (error.message.includes("No such payment_intent")) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 })
      }
      if (error.message.includes("Invalid API Key")) {
        return NextResponse.json({ error: "Payment service configuration error" }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 })
  }
}
