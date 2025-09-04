import chfBuyContractABI from './chfBuyContract.json'
import chfTokenABI from './chfToken.json'
import USDTABI from './USDT.json'

// Contract addresses
export const CONTRACTS = {

  chfBuyContract_ADDRESS: '0xC8BE7FB9b869A0882d48ef6f00d6A755Be423CC2',
  chfToken_ADDRESS: '0x8330c33ef546d3738f1029c4cd994c62b4d8ef6a',
  USDT_ADDRESS: '0x55d398326f99059fF775485246999027B3197955'
};

// Contract ABIs
export const ABIS = {
  chfBuyContract: chfBuyContractABI,
  chfToken: chfTokenABI,
  USDT: USDTABI
};

export const DECIMAL = 10 ** 18;
