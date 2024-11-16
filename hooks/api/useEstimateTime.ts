import useSWRMutation from 'swr/mutation'

interface Position {
  latitude: number
  longitude: number
}

interface EstimateTimePayload {
  tripId: string
  startPos: Position
  endPos: Position
  estEndTime: number
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST

if (!API_HOST) {
  throw new Error('NEXT_PUBLIC_API_HOST is not defined in environment variables')
}

async function estimateTimeFetcher(
  url: string,
  { arg }: { arg: EstimateTimePayload }
) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '111'
    },
    body: JSON.stringify(arg)
  })

  if (!response.ok) {
    throw new Error('Failed to update estimate time')
  }

  return response.json()
}

export function useEstimateTime() {
  return useSWRMutation(
    `${API_HOST}/api/estimate-time`,
    estimateTimeFetcher
  )
} 