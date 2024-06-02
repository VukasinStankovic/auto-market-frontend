import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:4001/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status) => {
        return status.toString().startsWith('2')
    }
})

export async function useAxios(path: string, method = 'get', payload = {}){
    return await client.request({
        url: path,
        method: method,
        data: payload
    })
}