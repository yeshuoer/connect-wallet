'use client'

import { WalletContext } from "@/app/walletProvider";
import { WalletType } from "@/enum";
import { log } from "@/utils";
import { Alert, Button, Modal } from "antd";
import { useContext, useState } from "react";

export default function ConnectButton() {
  const {
    account,
    chain,
    isConnect,
    errorMessage,
    connect,
    disconnect,
  } = useContext(WalletContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentType, setCurrentType] = useState(WalletType.OkxWallet)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleConnectWallet = async (type: WalletType) => {
    await connect(type)
    setCurrentType(type)
    setIsModalOpen(false)
    log('error message', errorMessage)
  }

  return <div>
    <section>
      {
        isConnect ? <div>
          <p>Account: {account}</p>
          <Button onClick={() => disconnect(currentType)}>Disconnect Wallet</Button>
        </div> : <Button onClick={handleOpenModal} type="primary">Connect Wallet</Button>
      }
    </section>
    <section className="mt-2">
      {
        errorMessage.length > 0 ? <Alert message={errorMessage} type="error" /> : null
      }
    </section>

    <Modal title="Wallet Type" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
      <ul>
        <li className="mb-2">
          <Button type="primary" onClick={() => handleConnectWallet(WalletType.OkxWallet)}>Okx Wallet</Button>
        </li>
        <li>
          <Button type="primary" onClick={() => handleConnectWallet(WalletType.UnisatWallet)}>Unisat Wallet</Button>
        </li>
      </ul>
    </Modal>
  </div>
}
