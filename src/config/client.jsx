import { http, createPublicClient } from 'viem'
import { bsc, bscTestnet} from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: bsc,
  // transport: http()
  transport: http('https://bsc-dataseed.binance.org'),
})