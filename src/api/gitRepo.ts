import axios from 'axios';

import { IGitRepo, IGitSession } from '../common/interfaces';

export interface IFetchGitReposResponse {
  session: IGitSession | null;
  repositories: IGitRepo[];
}

interface IFetchPublicReposResponseHeaders {
  test: number;
  'x-ratelimit-limit': number;
  'x-ratelimit-remaining': number;
  'x-ratelimit-reset': number;
}

export const fetchPublicRepos = async (page = 1): Promise<IFetchGitReposResponse> => {
  const response: { data: IGitRepo[]; headers: IFetchPublicReposResponseHeaders } = await axios.get(
    'https://api.github.com/orgs/reactjs/repos',
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      params: { type: 'public', page },
    },
  );
  response.headers;
  const session: IGitSession = {
    rateLimit: response.headers['x-ratelimit-limit'],
    rateRemaining: response.headers['x-ratelimit-remaining'],
    rateResetTime: response.headers['x-ratelimit-reset'],
  };
  console.log('response.headers', response.headers);
  return {
    session: session,
    repositories: response.data,
  };
};
