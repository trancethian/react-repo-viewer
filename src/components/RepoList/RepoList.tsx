import { ChangeEvent, useCallback, useState } from 'react';

import { Tooltip, Typography } from '@material-tailwind/react';

import { fetchRepositoriesByName } from '../../redux/gitRepo/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

import RepoListItem from './RepoListItem';

const RepoList = () => {
  const dispatch = useAppDispatch();
  const [searchRepoName, setSearchRepoName] = useState<string>('');
  const { repositories, loading, error } = useAppSelector((state: RootState) => state.gitRepo);

  const onInputSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      setSearchRepoName(newValue);

      if (newValue.length > 2) {
        dispatch(fetchRepositoriesByName({ searchName: e.target.value }));
      }
    },
    [dispatch],
  );

  return (
    <div>
      <h1 className="text-white text-shadow-lg shadow-black">
        <a className="hover:underline" href="https://react.dev" target="_blank" rel="noreferrer">
          React
        </a>{' '}
        Community Public Repos
      </h1>
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-4 rounded-lg bg-white px-3 py-2 shadow-md">
              <div className="mt-2 flex items-center rounded-md bg-gray-200">
                <div className="pl-2">
                  <svg
                    className="size-6 fill-current text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    />
                  </svg>
                </div>
                <Tooltip
                  open={searchRepoName.length > 0 && searchRepoName.length < 3}
                  content={
                    <Typography className="text-xs">
                      Type at least 3 letters to begin searching
                    </Typography>
                  }
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  placement="top-start"
                >
                  <input
                    className="w-full rounded-md bg-gray-200 p-2 leading-tight text-gray-700 focus:outline-none"
                    id="search"
                    type="text"
                    placeholder="Search Repo Name"
                    maxLength={256}
                    value={searchRepoName}
                    onChange={onInputSearch}
                    disabled={loading}
                  />
                </Tooltip>
              </div>
              <div className=" text-sm">
                {error && (
                  <div className="my-2 flex justify-start rounded-md p-2 text-red-700">
                    <span className="grow px-2 font-medium">
                      Oops! Something went wrong, please try again later!
                    </span>
                  </div>
                )}
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
