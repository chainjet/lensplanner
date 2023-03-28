import { fetchViewer } from '@/services/chainjet.service'
import { createContext, useCallback, useEffect, useState } from 'react'

export const ChainJetContext = createContext<{
  id: string | null
  isConnected: boolean
  loading: boolean
  refetch: () => Promise<void>
}>({ id: null, isConnected: false, loading: true, refetch: async () => {} })

interface Props {
  children: JSX.Element[] | JSX.Element
}

const ChainJetContextProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    const viewer = await fetchViewer()
    if (viewer) {
      setId(viewer.id)
      setIsConnected(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (localStorage['chainjet.token']) {
      refetch()
    }
  }, [refetch, setIsConnected])

  return <ChainJetContext.Provider value={{ id, isConnected, loading, refetch }}>{children}</ChainJetContext.Provider>
}

export default ChainJetContextProvider
