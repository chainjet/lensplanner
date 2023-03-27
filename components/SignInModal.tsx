import { useLensCredentials, useUser } from '@/hooks/chainjet.hooks'
import { useActiveProfile } from '@lens-protocol/react'
import { Modal, Text } from '@nextui-org/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import SignInWithChainJet from './SignInWithChainJet'
import SignInWithLens from './SignInWithLens'

interface Props {
  open: boolean
  onSignIn: (lensCredentials: { id: string; name: string }) => void
  onCancel: () => void
}

export default function SignInModal({ open, onSignIn, onCancel }: Props) {
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { id, isConnected: isConnectedToChainJet } = useUser()
  const { data: activeProfile, loading } = useActiveProfile()
  const { lensCredentials, loading: lensCredentialsLoading } = useLensCredentials()

  useEffect(() => {
    if (lensCredentials) {
      onSignIn(lensCredentials)
    }
  }, [lensCredentials, onSignIn])

  if (loading || lensCredentialsLoading || lensCredentials) {
    return <></>
  }

  const handleSignInWithLens = () => {
    // TODO add credentials to ChainJet
  }

  const handleChainJetSignIn = () => {
    // onSignIn()
  }

  return (
    <Modal closeButton aria-labelledby="modal-title" open={open} onClose={onCancel}>
      <Modal.Header className="border-b border-white">
        <Text id="modal-title" size={18}>
          Sign In with your wallet
        </Text>
      </Modal.Header>
      <Modal.Body>
        {isConnectedToChainJet ? (
          <SignInWithLens onSignIn={handleSignInWithLens} />
        ) : isConnected ? (
          <SignInWithChainJet onSignIn={handleChainJetSignIn} />
        ) : (
          <button
            onClick={openConnectModal}
            type="button"
            className="rounded-md bg-indigo-500 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Connect Wallet
          </button>
        )}
      </Modal.Body>
    </Modal>
  )
}
