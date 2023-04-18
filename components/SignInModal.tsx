import { useCreateLensCredentials, useLensCredentials, useUpdateLensCredentials, useUser } from '@/hooks/chainjet.hooks'
import { useActiveProfile } from '@lens-protocol/react'
import { Loading, Modal, Text } from '@nextui-org/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import SignInWithChainJet from './SignInWithChainJet'
import SignInWithLens from './SignInWithLens'

interface Props {
  open: boolean
  onSignIn: (lensCredentials: { id: string; name: string }) => void
  onCancel: () => void
  lensCredentialsExpired: boolean
}

export default function SignInModal({ open, onSignIn, onCancel, lensCredentialsExpired }: Props) {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { isConnected: isConnectedToChainJet, refetch } = useUser()
  const { data: activeProfile, loading: profileLoading } = useActiveProfile()
  const { lensCredentials, loading: lensCredentialsLoading } = useLensCredentials()
  const { createLensCredentials } = useCreateLensCredentials()
  const { updateLensCredentials } = useUpdateLensCredentials()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signedInWithLens, setSignedInWithLens] = useState(false)

  useEffect(() => {
    if (lensCredentials && (!lensCredentialsExpired || signedInWithLens)) {
      onSignIn(lensCredentials)
    }
  }, [lensCredentials, onSignIn, lensCredentialsExpired, signedInWithLens])

  const connectCredentials = useCallback(async () => {
    if (signedInWithLens && activeProfile) {
      if (!localStorage.getItem('lens.credentials')) {
        setError(`Error fetching credentials. Please try again.`)
        return
      }
      const credentials = JSON.parse(localStorage.getItem('lens.credentials') || '{}')
      if (!credentials.data.refreshToken) {
        setError(`Error fetching credentials. Please try again.`)
        return
      }
      setLoading(true)
      if (lensCredentials && lensCredentialsExpired) {
        await updateLensCredentials(lensCredentials.id, {
          profileId: activeProfile.id,
          handle: activeProfile.handle,
          accessToken: '',
          refreshToken: credentials.data.refreshToken,
        })
      } else {
        await createLensCredentials({
          profileId: activeProfile.id,
          handle: activeProfile.handle,
          accessToken: '',
          refreshToken: credentials.data.refreshToken,
        })
      }
      setLoading(false)
    }
  }, [
    activeProfile,
    createLensCredentials,
    lensCredentials,
    lensCredentialsExpired,
    signedInWithLens,
    updateLensCredentials,
  ])

  useEffect(() => {
    if (signedInWithLens && activeProfile) {
      connectCredentials()
    }
  }, [activeProfile, connectCredentials, signedInWithLens])

  if (profileLoading || lensCredentialsLoading || (lensCredentials && !lensCredentialsExpired)) {
    return <></>
  }

  const handleSignInWithLens = async () => {
    // we don't know if activeProfile has been loaded yet, so useEffect will take care of it
    setLoading(true)
    setSignedInWithLens(true)
  }

  const handleChainJetSignIn = async () => {
    setLoading(true)
    await refetch()
    setLoading(false)
  }

  return (
    <Modal closeButton aria-labelledby="modal-title" open={open} onClose={onCancel}>
      <Modal.Header className="border-b border-white">
        <Text id="modal-title" size={18}>
          Sign In with your wallet
        </Text>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loading />
        ) : isConnectedToChainJet ? (
          <SignInWithLens onSignIn={handleSignInWithLens} credentialsExpired={lensCredentialsExpired} />
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
        {error && <div className="text-red-500">{error}</div>}
      </Modal.Body>
    </Modal>
  )
}
