import { useWalletLogin } from '@lens-protocol/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

interface Props {
  onSignIn?: () => void
}

export default function SignInWithLens({ onSignIn }: Props) {
  const { isConnected } = useAccount()
  const { execute: login, error, isPending } = useWalletLogin()
  const { disconnectAsync } = useDisconnect()
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleSignIn = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { connector } = await connectAsync()

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner()
      await login(signer)
      onSignIn?.()
    }
  }

  return (
    <div className="my-4">
      <button
        onClick={handleSignIn}
        type="button"
        className="rounded-md bg-indigo-500 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Sign In With Lens
      </button>
    </div>
  )
}
