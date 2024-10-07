export interface IGitSession {
  resources: {
    search: {
      limit: number;
      remaining: number;
      reset: number;
    };
  };
}
export interface IGitRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  html_url: string;
}
