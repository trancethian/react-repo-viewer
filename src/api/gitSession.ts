import axios from 'axios';

export interface IFetchGitSessionResponse {
  resources: {
    search: {
      limit: number;
      remaining: number;
      reset: number;
    };
  };
}

export const fetchGitSession = async (): Promise<IFetchGitSessionResponse> => {
  const response: {
    data: IFetchGitSessionResponse;
  } = await axios.get('https://api.github.com/rate_limit', {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  return response.data;
};
