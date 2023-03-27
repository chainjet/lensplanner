export const lensAccountCredentialId = '6351be1ce711db17e2466efc' // it can also be fetched from fetchLensIntegrationAccount()

export async function fetchViewer() {
  const query = `{
    viewer {
      id
    }
  }`
  const data = await sendQuery(query)
  return data?.viewer
}

async function fetchLensIntegrationAccount() {
  const query = `{
    integrationAccounts (filter: { key: { eq: "lens" } }) {
      edges {
        node {
          id
        }
      }
    }
  }`
  const data = await sendQuery(query)
  return data?.integrationAccounts?.edges?.[0]?.node
}

export async function fetchLensCredentials(): Promise<Array<{ id: string; name: string }>> {
  const query = `{
    accountCredentials (filter: { integrationAccount: { eq: "${lensAccountCredentialId}" } }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }`
  const data = await sendQuery(query)
  return data?.accountCredentials?.edges?.map((edge: any) => edge.node) ?? []
}

export async function forkWorkflow(id: string, templateInputs: any, credentialIds: any) {
  const query = `
  mutation forkWorkflow($workflowId: ID!, $templateInputs: JSONObject, $credentialIds: JSONObject) {
    forkWorkflow(workflowId: $workflowId, templateInputs: $templateInputs, credentialIds: $credentialIds) {
      id
    }
  }`
  const data = await sendQuery(query, { workflowId: id, templateInputs, credentialIds })
  return data?.forkWorkflow?.id
}

async function sendQuery(query: string, variables: Record<string, any> = {}) {
  const res = await fetch('https://api.chainjet.io/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['chainjet.token']}`,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  return json?.data
}