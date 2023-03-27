import { Loading } from '@nextui-org/react'
import { useState } from 'react'
import { SiweMessage } from 'siwe'
import { v4 as uuidv4 } from 'uuid'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

interface Props {
  onSignIn?: () => void
}

export default function SignInWithChainJet({ onSignIn }: Props) {
  const { address } = useAccount()
  const { chain: activeChain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    return <div className="text-red-600">{error?.message ?? 'Unexpected error, please try again.'}</div>
  }
  if (loading) {
    return <Loading />
  }

  const handleSignIn = async () => {
    try {
      const chainId = activeChain?.id
      if (!address || !chainId) {
        return
      }

      setLoading(true)
      setError(null)

      const uuid = uuidv4()
      let nonce: string
      try {
        const nonceRes = await fetch(`https://api.chainjet.io/auth/nonce`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid }),
          credentials: 'include',
        })
        nonce = await nonceRes.text()
      } catch (error) {
        setLoading(false)
        setError(error as Error)
        return
      }

      // Create SIWE message with the nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign-In on ChainJet.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      const loginRes = await fetch(`https://api.chainjet.io/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature, uuid }),
        credentials: 'include',
      })
      if (!loginRes.ok) {
        throw new Error(`Error verifying message: ${(await loginRes.text()) ?? loginRes.statusText}`)
      }

      localStorage.setItem('chainjet.token', JSON.stringify({ message, signature }))
      onSignIn?.()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error as Error)
    }
  }

  return (
    <div>
      <div className="my-4">
        <button
          onClick={handleSignIn}
          type="button"
          className="rounded-md bg-indigo-500 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Sign In With ChainJet
        </button>
      </div>
      <div>
        <span className="text-xs">ChainJet is used to record the publication and post it at the specified time.</span>
      </div>
    </div>
  )
}
