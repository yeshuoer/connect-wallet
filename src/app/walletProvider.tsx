'use client'

import { ChainType, WalletType } from "@/enum";
import { log } from "@/utils";
import React, { useCallback, useMemo, useState } from "react";

export const WalletContext = React.createContext<WalletContext>({} as WalletContext)

export function WalletProvider({
  children
}: React.PropsWithChildren) {
  const [account, setAccount] = useState("")
  const [isConnect, setIsConnect] = useState(false)
  const [chain, setChain] = useState(ChainType.Bitcoin)
  const [errorMessage, setErrorMessage] = useState("")

  const connectOkxWallet = async (): Promise<void> => {
    if (typeof window.okxwallet === 'undefined') {
      setErrorMessage('okx wallet not installed')
      return
    }
    if (chain === ChainType.Bitcoin) {
      try {
        let accounts = await window.okxwallet.bitcoin.requestAccounts()
        setAccount(accounts[0])
        setIsConnect(true)
      } catch(e: any) {
        setErrorMessage(e.message)
      }
    } else if (chain === ChainType.EVM) {

    }
  }

  const connectUnisatWallet = async (): Promise<void> => {
    if (typeof window.unisat === 'undefined') {
      setErrorMessage('unisat wallet not installed')
      return
    }
    try {
      let accounts = await window.unisat.requestAccounts()
      setAccount(accounts[0])
      setIsConnect(true)
      if (chain === ChainType.EVM) {
        // unisat only support bitcoin
        setChain(ChainType.Bitcoin)
      }
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  }

  const unisatAccountChangeHandler = (accounts: Array<string>):void => {
    setAccount(accounts[0])
  }
  
  const okxAccountChangeHandler = (addressInfo: any) => {
    setAccount(addressInfo.address)
  }

  const connect = useCallback(async (type: WalletType): Promise<void> => {
    if (type === WalletType.OkxWallet) {
      await connectOkxWallet()
      // listen
      window.okxwallet.bitcoin.on('accountChanged', okxAccountChangeHandler)
    } else {
      await connectUnisatWallet()
      window.unisat.on('accountsChanged', unisatAccountChangeHandler);
    }
  }, [])

  const disconnect = useCallback((type: WalletType) => {
    setAccount('')
    setErrorMessage('')
    setIsConnect(false)
    if (type === WalletType.OkxWallet) {
      window.okxwallet.bitcoin.removeListener('accountChanged', okxAccountChangeHandler)
    } else {
      window.unisat.removeListener('accountsChanged', unisatAccountChangeHandler)
    }
  }, [])

  const contextValue = useMemo(() => ({
    errorMessage,
    isConnect,
    account,
    chain,
    connect,
    disconnect,
  }), [account, chain, errorMessage, isConnect])

  return <WalletContext.Provider value={contextValue}>
    {children}
  </WalletContext.Provider>
}
