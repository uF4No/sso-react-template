'use client'

import { useAccount, useBalance, useChainId } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getPublicClient } from '@wagmi/core'
import { getConfig } from '../../wagmi'
import { zksyncSepoliaTestnet } from 'viem/chains'
import { Copy, Check } from 'lucide-react'

export default function Account() {
  const account = useAccount()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isSmartContract, setIsSmartContract] = useState<boolean | null>(null)
  const address = account.addresses?.[0]
  const chainId = useChainId()

  // Create a public client
  const publicClient = getPublicClient(getConfig())
  

  useEffect(() => {
    async function checkIsSmartContract() {
      if (!address) return
      
      try {
        const code = await publicClient.getCode({
          address: address as `0x${string}`
        })
        // If code length > 2 ('0x'), it's a smart contract
        setIsSmartContract(code.length > 2)
      } catch (error) {
        console.error('Error checking contract code:', error)
        setIsSmartContract(false)
      }
    }

    checkIsSmartContract()
  }, [address, publicClient])

  const { data: balance } = useBalance({
    address: address as `0x${string}`,
    // chainId: zkSyncTestnet.id,
    watch: true
  })

  useEffect(() => {
    if (account.status !== 'connected') {
      router.push('/')
    }
  }, [account.status, router])

  const copyToClipboard = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getExplorerLink = (address: string) => {
    return `${process.env.NEXT_PUBLIC_EXPLORER_URL}${address}`
  }

  if (!address) return null

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Account Details</h2>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          {/* Network */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Network</h3>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {chainId === zksyncSepoliaTestnet.id ? 'zkSync Sepolia' : 'Unknown Network'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Chain ID: {chainId}
              </span>
            </div>
          </div>

          {/* Account Type */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Account Type</h3>
            <div className="flex items-center space-x-2">
              {isSmartContract === null ? (
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                  Checking...
                </span>
              ) : (
                <span className={`px-3 py-1 rounded-full text-sm ${
                  isSmartContract 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {isSmartContract ? 'Smart Contract Account' : 'EOA'}
                </span>
              )}
              <a
                href={getExplorerLink(address)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View on Explorer ↗
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                {address}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Balance */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Balance</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-mono">
                {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
