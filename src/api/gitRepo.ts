import axios from 'axios';

import { IGitRepo, IGitSession } from '../common/interfaces';

export interface IFetchGitReposParams {
  page: number;
  searchName: string;
}
export interface IFetchPublicReposResponse {
  session: IGitSession | null;
  repositories: IGitRepo[];
}

interface IFetchPublicReposResponseHeaders {
  test: number;
  'x-ratelimit-limit': number;
  'x-ratelimit-remaining': number;
  'x-ratelimit-reset': number;
}

export const fetchPublicRepos = async (
  params: IFetchGitReposParams,
): Promise<IFetchPublicReposResponse> => {
  let query = 'org:reactjs';

  if (params.searchName) {
    query += ` ${params.searchName}`;
  }

  const queryParams = {
    q: query,
    sort: 'stars',
    order: 'desc',
    per_page: 10,
    page: params.page,
  };
  const response: {
    data: { total_count: number; items: IGitRepo[] };
    headers: IFetchPublicReposResponseHeaders;
  } = await axios.get('https://api.github.com/search/repositories', {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    params: queryParams,
  });
  response.headers;
  const session: IGitSession = {
    rateLimit: response.headers['x-ratelimit-limit'],
    rateRemaining: response.headers['x-ratelimit-remaining'],
    rateResetTime: response.headers['x-ratelimit-reset'],
  };
  console.log('response.headers', response.headers);
  return {
    session: session,
    repositories: response.data.items,
  };
};
