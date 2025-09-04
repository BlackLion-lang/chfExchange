import { http, createConfig } from '@wagmi/core'
import { bsc, bscTestnet } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
    // [bscTestnet.id]: http(),
  },
})