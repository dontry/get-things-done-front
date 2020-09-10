import axios, { AxiosProxyConfig, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';

import { persistanceService } from '../classes/PersistanceService';
import { messageStore, routerStore } from '../stores';
import { MessageType } from '../types';

let cancel: Canceler;
const promiseArray: any = {};
const CancelToken = axios.CancelToken;

export const apiService = {
  get(url: string, params?: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      httpClient({
        method: 'get',
        url,
        params,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
        .then(response => {
          resolve(response);
        })
        .catch(handleNetworkError(reject));
    });
  },
  post(url: string, payload: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      httpClient({
        method: 'post',
        url,
        data: payload,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
        .then(response => {
          resolve(response);
        })
        .catch(handleNetworkError(reject));
    });
  },
  delete(url: string, params?: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      httpClient({
        method: 'delete',
        url,
        params,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
        .then(response => {
          resolve(response);
        })
        .catch(handleNetworkError(reject));
    });
  },
  put(url: string, payload: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      httpClient({
        method: 'put',
        url,
        data: payload,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
        .then(response => {
          resolve(response);
        })
        .catch(handleNetworkError(reject));
    });
  }
};

const options: AxiosRequestConfig = {
  baseURL: process.env.BASE_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 10000,
  withCredentials: true
};

const httpClient = axios.create(options);

httpClient.defaults.proxy = {
  host: 'http://localhost',
  port: 3000
};

httpClient.interceptors.request.use(
  (config: any) => {
    // cancel previous same request
    if (promiseArray[config.url]) {
      promiseArray[config.url]('Cancel');
      promiseArray[config.url] = cancel;
    } else {
      promiseArray[config.url] = cancel;
    }

    const token = persistanceService.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

httpClient.interceptors.response.use(
  response => {
    if (/^2\w/.test(response.status.toString())) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    try {
      if (error.response.status) {
        switch (error.response.status) {
          // Unauthorized
          case 401:
            // TODO: redirect to login
            if (error.response.data.message === 'jwt expired') {
              httpClient.post('/renew_session').then(res => {
                persistanceService.setItem('access_token', res.data.access_token);
              });
            } else {
              routerStore.push('/login');
            }
            break;
          case 403:
            // TODO: Forbidden token expires
            persistanceService.removeItem('token');
            routerStore.push('/login');
            break;
          case 404:
            // TODO: Page not found
            routerStore.push('/404');
            break;
          case 500:
          default:
            // TODO: Server error
            routerStore.push('/500');
        }
        return Promise.reject(error.response);
      }
    } catch (e) {
      return Promise.reject(error);
    }
  }
);

function handleNetworkError(reject: any) {
  return (error: any) => {
    if (error.data) {
      messageStore.setError(MessageType.NETWORK, error.data.message);
    } else {
      messageStore.setError(MessageType.NETWORK, error.message);
    }
    reject(error);
  };
}
