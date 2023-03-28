import ChainJetContextProvider from '@/components/providers/ChainJetContextProvider'
import '@/styles/globals.css'
import { localStorage } from '@/utils/storage'
import { appId, LensConfig, LensProvider, production } from '@lens-protocol/react'
import { bindings as wagmiBindings } from '@lens-protocol/wagmi'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  arbitrum,
  arbitrumGoerli,
  aurora,
  auroraTestnet,
  avalanche,
  avalancheFuji,
  baseGoerli,
  boba,
  bronos,
  bronosTestnet,
  bsc,
  bscTestnet,
  canto,
  celo,
  celoAlfajores,
  cronos,
  crossbell,
  dfk,
  dogechain,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  filecoin,
  filecoinCalibration,
  filecoinHyperspace,
  flare,
  flareTestnet,
  foundry,
  gnosis,
  gnosisChiado,
  goerli,
  hardhat,
  harmonyOne,
  iotex,
  iotexTestnet,
  klaytn,
  localhost,
  mainnet,
  metis,
  metisGoerli,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  okc,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvmTestnet,
  scrollTestnet,
  sepolia,
  shardeumSphinx,
  skaleBlockBrawlers,
  skaleCalypso,
  skaleCalypsoTestnet,
  skaleChaosTestnet,
  skaleCryptoBlades,
  skaleCryptoColosseum,
  skaleEuropa,
  skaleEuropaTestnet,
  skaleExorde,
  skaleHumanProtocol,
  skaleNebula,
  skaleNebulaTestnet,
  skaleRazor,
  skaleTitan,
  skaleTitanTestnet,
  songbird,
  songbirdTestnet,
  taraxa,
  taraxaTestnet,
  telos,
  telosTestnet,
  wanchain,
  wanchainTestnet,
  zhejiang,
  zkSync,
  zkSyncTestnet,
} from '@wagmi/core/chains'
import type { AppProps } from 'next/app'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [
    arbitrum,
    arbitrumGoerli,
    aurora,
    auroraTestnet,
    avalanche,
    avalancheFuji,
    baseGoerli,
    boba,
    bronos,
    bronosTestnet,
    bsc,
    bscTestnet,
    canto,
    celo,
    celoAlfajores,
    cronos,
    crossbell,
    dfk,
    dogechain,
    evmos,
    evmosTestnet,
    fantom,
    fantomTestnet,
    filecoin,
    filecoinCalibration,
    filecoinHyperspace,
    flare,
    flareTestnet,
    foundry,
    gnosis,
    gnosisChiado,
    goerli,
    hardhat,
    harmonyOne,
    iotex,
    iotexTestnet,
    klaytn,
    localhost,
    mainnet,
    metis,
    metisGoerli,
    moonbaseAlpha,
    moonbeam,
    moonriver,
    okc,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    polygonZkEvmTestnet,
    scrollTestnet,
    sepolia,
    shardeumSphinx,
    skaleBlockBrawlers,
    skaleCalypso,
    skaleCalypsoTestnet,
    skaleChaosTestnet,
    skaleCryptoBlades,
    skaleCryptoColosseum,
    skaleEuropa,
    skaleEuropaTestnet,
    skaleExorde,
    skaleHumanProtocol,
    skaleNebula,
    skaleNebulaTestnet,
    skaleRazor,
    skaleTitan,
    skaleTitanTestnet,
    songbird,
    songbirdTestnet,
    taraxa,
    taraxaTestnet,
    telos,
    telosTestnet,
    wanchain,
    wanchainTestnet,
    zhejiang,
    zkSync,
    zkSyncTestnet,
  ],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'LensPlanner',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
  storage: localStorage(),
  sources: [appId('ChainJet')],
}

const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <LensProvider config={lensConfig}>
          <ChainJetContextProvider>
            <NextUIProvider theme={theme}>
              <Component {...pageProps} />
            </NextUIProvider>
          </ChainJetContextProvider>
        </LensProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
