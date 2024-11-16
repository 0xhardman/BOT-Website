import useSWRMutation from 'swr/mutation'

interface RegisterEmailPayload {
    address: string
    email: string
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST

// 检查环境变量是否已配置
if (!API_HOST) {
    throw new Error('NEXT_PUBLIC_API_HOST is not defined in environment variables')
}

// 发送 PUT 请求的函数
async function registerEmailFetcher(
    url: string,
    { arg }: { arg: RegisterEmailPayload }
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
        throw new Error('Failed to register email')
    }

    return response.json()
}

export function useRegisterEmail() {
    return useSWRMutation(
        `${API_HOST}/api/register-email`,
        registerEmailFetcher
    )
} 