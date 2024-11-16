import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

const APP_ID = process.env.NEXT_PUBLIC_NILLION_APP_ID
const USER_SEED = process.env.NEXT_PUBLIC_NILLION_USER_SEED
const API_BASE = process.env.NEXT_PUBLIC_NILLION_API_BASE

export function useNillionUserId() {
    return useSWR('nillion-user', async () => {
        const response = await fetch(`${API_BASE}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nillion_seed: USER_SEED }),
        })
        const data = await response.json()
        return data.nillion_user_id
    })
}

export function useStoreSecret() {
    return useSWRMutation(
        'store-secret',
        async (_, { arg: { secretValue, secretName } }: { arg: { secretValue: number | string, secretName: string } }) => {
            const response = await fetch(`${API_BASE}/api/apps/${APP_ID}/secrets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret: {
                        nillion_seed: USER_SEED,
                        secret_value: secretValue,
                        secret_name: secretName,
                    },
                    permissions: {
                        retrieve: [],
                        update: [],
                        delete: [],
                        compute: {},
                    },
                }),
            })
            return response.json()
        }
    )

    // return { storeSecret }
}


export function useStoreIds() {
    return useSWR('store-ids', async () => {
        const response = await fetch(`${API_BASE}/api/apps/${APP_ID}/store_ids`)
        const data = await response.json()
        return data.store_ids
    })
}


export function useSecret(storeId: string, secretName: string) {
    return useSWR(
        storeId ? [`secret`, storeId, secretName] : null,
        async () => {
            const response = await fetch(
                `${API_BASE}/api/secret/retrieve/${storeId}?retrieve_as_nillion_user_seed=${USER_SEED}&secret_name=${secretName}`
            )
            return response.json()
        }
    )
}

export function useUpdateSecret() {
    const updateSecret = async (storeId: string, secretName: string, newValue: number | string) => {
        const response = await fetch(
            `${API_BASE}/api/apps/${APP_ID}/secrets/${storeId}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nillion_seed: USER_SEED,
                    secret_value: newValue,
                    secret_name: secretName
                }),
            }
        )
        const data = await response.json()
        await mutate(['secret', storeId, secretName])
        return data
    }

    return { updateSecret }
} 