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

export async function createCredentials(credentials: {
  name: string
  integrationAccount: string
  inputs: Record<string, any>
}) {
  const query = `
  mutation ($input: CreateOneAccountCredentialInput!) {
    createOneAccountCredential(input: $input) {
      id
    }
  }`
  const variables = {
    input: {
      accountCredential: {
        name: credentials.name,
        integrationAccount: credentials.integrationAccount,
        credentialInputs: credentials.inputs,
      },
    },
  }
  const data = await sendQuery(query, variables)
  return data?.createOneAccountCredential?.id
}

export async function updateCredentials(
  accountId: string,
  credentials: {
    name: string
    integrationAccount: string
    inputs: Record<string, any>
  },
) {
  const query = `
  mutation ($input: UpdateOneAccountCredentialInput!) {
    updateOneAccountCredential(input: $input) {
      id
    }
  }`
  const variables = {
    input: {
      id: accountId,
      update: {
        name: credentials.name,
        credentialInputs: credentials.inputs,
      },
    },
  }
  const data = await sendQuery(query, variables)
  return data?.createOneAccountCredential?.id
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
  if (json.errors) {
    throw new Error(json.errors[0].message)
  }
  return json?.data
}
