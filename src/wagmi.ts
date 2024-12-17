import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { zkSyncTestnet } from '@wagmi/chains'
import { injected } from 'wagmi/connectors'
import {zksyncSsoConnector, callPolicy} from "zksync-sso/connector"

const ssoConnector = zksyncSsoConnector({
  metadata: {
    name: "SSO React Template App",
    icon: "https://nft.zksync.dev/favicon.svg",
  },
})

export function getConfig() {
  return createConfig({
    chains: [zkSyncTestnet],
    connectors: [
      injected(),
      ssoConnector,
    ],
    transports: {
      [zkSyncTestnet.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
