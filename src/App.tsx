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
        <USDTbalance/>
        <Account/>
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

function USDTbalance(){

  const {data} = useReadContract({
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi,
    functionName : 'balanceOf',
    args:['0xB102654F07e3d2198dF22E9808cc21eD1A6B3EfD']
  })

  return <div>
    Usdc Balance of x is {data?.toString()}   
  </div>

}

function Account(){
  const {address} = useAccount();
  if (address){
    return <div>You are connected</div>
  }
  else{
    return <div>You are not connected</div>
  }
}

export default App