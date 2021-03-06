/* eslint-disable no-param-reassign */
import Axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore, useToastStore } from '@/stores';
import { handleToken } from '@/features/auth/api/handleToken';

async function authRequestInterceptor(config: AxiosRequestConfig) {
  if (config.headers === undefined) {
    config.headers = {};
  }
  if (config.params === undefined) {
    config.params = {};
  }
  await handleToken();
  const { token } = useAuthStore.getState();
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = 'application/json';
  config.headers['User-Agent'] =
    'android:com.sr.proton:0.0.1 (by /u/Soul-Remix)';
  config.params.raw_json = 1;
  return config;
}

export const axios = Axios.create({
  baseURL: 'https://oauth.reddit.com',
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const text = error.response?.data?.message || error.message;
    useToastStore.getState().addToast({
      type: 'error',
      text,
    });

    return Promise.reject(error);
  }
);
