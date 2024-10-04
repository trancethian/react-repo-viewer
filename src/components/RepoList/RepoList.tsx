import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRepositoriesRequest } from '../../redux/gitRepo/slice';
import { RootState } from '../../redux/store';
import RepoListItem from './RepoListItem';

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
      <h1 className="text-shadow-lg shadow-black">React Community Public Repos</h1>
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="flex justify-center py-10">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
              {/* <div className="block text-gray-700 text-lg font-semibold py-2 px-2">Item List</div> */}
              <div className="flex items-center mt-2 bg-gray-200 rounded-md">
                <div className="pl-2">
                  <svg
                    className="fill-current text-gray-500 w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    />
                  </svg>
                </div>
                <input
                  className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                  id="search"
                  type="text"
                  placeholder="Search repo name"
                />
              </div>
              <div className=" text-sm">
                {repositories.map((repo) => (
                  <RepoListItem key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoList;
