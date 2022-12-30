import axios from 'axios';

export const providerOne = axios.create({
  baseURL:
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider',
});

export const providerTwo = axios.create({
  baseURL:
    ' http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider',
});
