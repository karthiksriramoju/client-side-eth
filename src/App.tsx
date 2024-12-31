import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount, useConnect, useConnectors, useDisconnect, useReadContract } from 'wagmi'
import './App.css'
import { config } from './config'
import {abi} from './abi.ts'

const client = new QueryClient();

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply />
     </QueryClientProvider>
    </WagmiProvider>
  )
}

function ConnectWallet() {
  const { address } = useAccount()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect();
  const {connect} = useConnect();

  if (address) {
    return <div>
      You are connected {address}
      <button onClick={() => {
        disconnect()
      }}>Disconnect</button>
    </div>
  }
  return <div>
    {connectors.map(connector => <button onClick={() => {
      connect({connector: connector})
    }}>
      Connect via {connector.name}
    </button>)}
  </div>
}

function TotalSupply(){

  const {data} = useReadContract({
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi,
    functionName : 'totalSupply',
  })

  return <div>
    Total supply of Usdc is {data?.toString()}   
  </div>

}

export default App