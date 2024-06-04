import axios, {AxiosResponse} from "axios";
import {AuthService} from "@/services/auth.service";

const client = axios.create({
    baseURL: 'http://localhost:4001/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status) => {
        return status.toString().startsWith('2');
    }
});

export async function login(username: string, password: string) {
    return await client.request({
        url: '/user/login',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    })
}

export async function useAxios(path: string, method = 'get', payload = {}) {

    let rsp: AxiosResponse;

    try {
        rsp = await client.request({
            url: path,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${AuthService.getAccessToken()}`
            },
            data: payload
        }) as AxiosResponse;
    } catch (e) {
        rsp = (e as AxiosError).response as AxiosResponse;
    }

    if (rsp == undefined || rsp.status == 401) {
        window.location.href = '/login';
    }

    if (rsp.status == 403) {
        try {
            const token = await client.request({
                url: '/user/refresh',
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthService.getRefreshToken()}`
                },
            });

            AuthService.saveAuth(token.data);

            return await client.request({
                url: path,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthService.getAccessToken()}`
                },
                data: payload
            });
        } catch (err) {
            {
                console.log(err);
                AuthService.clearAuth();
                throw new Error('REFRESH_FAILED');
            }
        }
    }

    if (rsp.status == 404) {
        throw new Error('NOT_FOUND');
    }

    return rsp;
}