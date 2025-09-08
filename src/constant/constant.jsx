import chfBuyContractABI from './chfBuyContract.json'
import chfTokenABI from './chfToken.json'
import USDTABI from './USDT.json'

// Contract addresses
export const CONTRACTS = {

  chfBuyContract_ADDRESS: '0xE7c5c2b4615cD0e9Bf421796A559F9CFe79514d1',
  chfToken_ADDRESS: '0x6975543aa89f11781be639c9af052a4ceddf03cc',
  USDT_ADDRESS: '0x55d398326f99059fF775485246999027B3197955'
};

// Contract ABIs
export const ABIS = {
  chfBuyContract: chfBuyContractABI,
  chfToken: chfTokenABI,
  USDT: USDTABI
};

export const DECIMAL = 10 ** 18;
