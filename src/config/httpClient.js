import axios from 'axios';

const githubAPI = axios.create({
  baseURL: 'https://github-trending-api.now.sh',
});

const appAPI = axios.create({
  baseURL: 'http://localhost:1323/',
});

export const config = {appAPI: appAPI, githubAPI: githubAPI};
