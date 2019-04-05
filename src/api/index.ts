import axios, { Canceler, AxiosResponse } from "axios";
import appStore from "../stores";

let cancel: Canceler;
const promiseArray: any = {};
const CancelToken = axios.CancelToken;

const options = {
  baseURL: "/api",
  headers: { "X-Requested-With": "XMLHttpRequest" },
  timeout: 10000
};

const httpClient = axios.create(options);

httpClient.interceptors.request.use(
  (config: any) => {
    // cancel previous same request
    if (promiseArray[config.url]) {
      promiseArray[config.url]("Cancel");
      promiseArray[config.url] = cancel;
    } else {
      promiseArray[config.url] = cancel;
    }

    // TODO: add token
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
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
    if (error.response.status) {
      switch (error.response.status) {
        // Unauthorized
        case 401:
          // TODO: redirect to login
          break;
        case 403:
          // TODO: Forbidden token expires
          // localStorage.removeItem("token");
          break;
        case 404:
          // TODO: Page not found
          appStore.router.push("/404");
        case 500:
        default:
          // TODO: Server error
          appStore.router.push("/500");
      }
      return Promise.reject(error.response);
    }
  }
);

export default {
  get(url: string, params: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      httpClient({
        method: "get",
        url,
        params,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(response => {
        resolve(response);
      });
    });
  },
  post(url: string, payload: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      httpClient({
        method: "post",
        url,
        data: payload,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(response => {
        resolve(response);
      });
    });
  },
  put(url: string, payload: any): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      httpClient({
        method: "put",
        url,
        data: payload,
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(response => {
        resolve(response);
      });
    });
  }
};
