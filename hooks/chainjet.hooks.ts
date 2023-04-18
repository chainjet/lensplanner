import { ChainJetContext } from '@/components/providers/ChainJetContextProvider'
import {
  createCredentials,
  fetchLensCredentials,
  forkWorkflow,
  lensAccountCredentialId,
  updateCredentials,
} from '@/services/chainjet.service'
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
      let newWorkflowId = null
      try {
        const credentialIds = {
          [lensAccountCredentialId]: lensCredentials.id,
        }
        newWorkflowId = await forkWorkflow(id, templateInputs, credentialIds)
        setWorkflowId(newWorkflowId)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
        throw err
      }
      return newWorkflowId
    },
    [],
  )

  return { schedulePost, loading, error, workflowId }
}

export function useCreateLensCredentials() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [credentialId, setCredentialId] = useState(null)

  const createLensCredentials = useCallback(
    async (credentials: { profileId: string; handle: string; accessToken: string; refreshToken: string }) => {
      setLoading(true)
      let newCredentialId = null
      try {
        newCredentialId = await createCredentials({
          name: `Lens Profile ${credentials.handle}`,
          integrationAccount: lensAccountCredentialId,
          inputs: {
            profileId: credentials.profileId,
            handle: credentials.handle,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          },
        })
        setCredentialId(newCredentialId)
      } catch (err) {
        setError(err as Error)
      }
      setLoading(false)
      return newCredentialId
    },
    [],
  )

  return { createLensCredentials, loading, error, credentialId }
}

export function useUpdateLensCredentials() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [credentialId, setCredentialId] = useState(null)

  const updateLensCredentials = useCallback(
    async (
      accountId: string,
      credentials: { profileId: string; handle: string; accessToken: string; refreshToken: string },
    ) => {
      setLoading(true)
      let newCredentialId = null
      try {
        newCredentialId = await updateCredentials(accountId, {
          name: `Lens Profile ${credentials.handle}`,
          integrationAccount: lensAccountCredentialId,
          inputs: {
            profileId: credentials.profileId,
            handle: credentials.handle,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          },
        })
        setCredentialId(newCredentialId)
      } catch (err) {
        setError(err as Error)
      }
      setLoading(false)
      return newCredentialId
    },
    [],
  )

  return { updateLensCredentials, loading, error, credentialId }
}
