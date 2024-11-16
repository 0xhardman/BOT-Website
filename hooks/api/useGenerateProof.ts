import useSWRMutation from 'swr/mutation'

interface GenerateProofResponse {
  txHash: string
  [key: string]: any  // 用于处理其他可能的返回参数
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST

if (!API_HOST) {
  throw new Error('NEXT_PUBLIC_API_HOST is not defined in environment variables')
}

async function generateProofFetcher(
  url: string,
  { arg }: { arg: { email: string; emlFile: File } }
) {
  const formData = new FormData()
  formData.append('emlFile', arg.emlFile)

  const response = await fetch(
    `${API_HOST}/api/vlayer/generate-proof/${encodeURIComponent(arg.email)}`,
    {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': '111',
        // 注意：使用 FormData 时不要设置 Content-Type，
        // 浏览器会自动设置正确的 Content-Type 和 boundary
      },
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error('Failed to generate proof')
  }

  return response.json() as Promise<GenerateProofResponse>
}

export function useGenerateProof() {
  return useSWRMutation(
    'generate-proof', // 这里使用一个key标识符即可，实际URL在fetcher中构建
    generateProofFetcher
  )
} 