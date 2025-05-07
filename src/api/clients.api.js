import { api } from '@/utils/api/index.js'
import { reformatPhoneNumber } from '@/helpers/index.js'

export function getClientsListApi(page, size) {
    return api({
        url: '/client',
        method: 'GET',
        params: {
            page,
            size
        }
    })
}
