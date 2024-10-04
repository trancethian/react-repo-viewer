import axios, { AxiosResponse } from 'axios';
import { IGitRepo } from '../common/interfaces';

export const fetchPublicRepos = async (page = 1): Promise<IGitRepo[]> => {
  const response: AxiosResponse<IGitRepo[]> = await axios.get(
    'https://api.github.com/orgs/reactjs/repos',
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      params: { type: 'public', page },
    },
  );

  return response.data;
};
