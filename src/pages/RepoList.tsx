import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchRepositoriesRequest } from '../redux/gitRepo/slice';
import { RootState } from '../redux/store';

const RepoList = () => {
  const dispatch = useAppDispatch();

  const { repositories, loading, error, page } = useAppSelector(
    (state: RootState) => state.gitRepo,
  );

  const loadRepos = (page: number) => {
    dispatch(fetchRepositoriesRequest({ page }));
  };

  useEffect(() => {
    loadRepos(page);
  }, [dispatch, page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>React Community Repositories</h1>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
