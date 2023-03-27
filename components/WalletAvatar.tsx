import { useProfilesOwnedBy } from '@lens-protocol/react'

interface Props {
  address: string
}

export default function WalletAvatar({ address }: Props) {
  const { data } = useProfilesOwnedBy({ address })

  if (!data) {
    return <></>
  }

  const profile = data[0]
  const picture = (profile?.picture as any)?.original?.url
  if (!picture) {
    return <></>
  }

  const url = picture.replace('ipfs://', 'https://gateway.ipfscdn.io/ipfs/')
  return <img className="inline-block h-10 w-10 rounded-full" src={url} alt={`${profile.handle} Profile Picture`} />
}
