import { fetchViewer } from '@/services/chainjet.service'
import { createContext, useEffect, useState } from 'react'

export const ChainJetContext = createContext<{
  id: string | null
  isConnected: boolean
  loading: boolean
}>({ id: null, isConnected: false, loading: true })

interface Props {
  children: JSX.Element[] | JSX.Element
}

const ChainJetContextProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const viewer = await fetchViewer()
      if (viewer) {
        setId(viewer.id)
        setIsConnected(true)
      }
      setLoading(false)
    }

    if (localStorage['chainjet.token']) {
      run()
    }
  }, [setIsConnected])

  return <ChainJetContext.Provider value={{ id, isConnected, loading }}>{children}</ChainJetContext.Provider>
}

export default ChainJetContextProvider
