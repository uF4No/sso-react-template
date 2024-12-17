'use client'

import { useAccount, useBalance, useEnsName } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isAddress, getAddress } from 'viem'

export default function Account() {
  const account = useAccount()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const address = account.addresses?.[0]
  
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
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
    return `https://explorer.zksync.io/address/${address}`
  }

  const isSmartContract = account.addresses?.[0] ? 
    account.addresses[0].length > 42 : false // Simple check, can be enhanced

  if (!address) return null

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Account Details</h2>
        
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          {/* Account Type */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Account Type</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${
                isSmartContract 
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {isSmartContract ? 'Smart Contract Account' : 'EOA'}
              </span>
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
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? '✓' : '📋'}
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
