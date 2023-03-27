import { ChainJetContext } from '@/components/providers/ChainJetContextProvider'
import { fetchLensCredentials, forkWorkflow, lensAccountCredentialId } from '@/services/chainjet.service'
import { useCallback, useContext, useEffect, useState } from 'react'

export function useUser() {
  return useContext(ChainJetContext)
}

export function useLensCredentials() {
  const [lensCredentials, setLensCredentials] = useState<{ id: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      const lensCredentials = await fetchLensCredentials()
      setLensCredentials(lensCredentials?.[0] ?? null)
      setLoading(false)
    }
    run()
  })

  return { lensCredentials, loading }
}

export function useSchedulePost() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [workflowId, setWorkflowId] = useState(null)

  const schedulePost = useCallback(
    async (id: string, templateInputs: any, lensCredentials: { id: string; name: string }) => {
      setLoading(true)
      try {
        const credentialIds = {
          [lensAccountCredentialId]: lensCredentials.id,
        }
        const workflowId = await forkWorkflow(id, templateInputs, credentialIds)
        setWorkflowId(workflowId)
      } catch (err) {
        setError(err as Error)
      }
      setLoading(false)
    },
    [],
  )

  return { schedulePost, loading, error, workflowId }
}
