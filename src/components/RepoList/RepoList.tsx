import { ChangeEvent, UIEvent, useCallback, useState } from 'react';

import arrowDownIcon from '@/assets/arrow-down-circle.svg';
import { Tooltip, Typography } from '@material-tailwind/react';

import { fetchRepositoriesRequest } from '../../redux/gitRepo/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

import RepoListItem from './RepoListItem';
import RepoListItemLoader from './RepoListItemLoader';

const RepoList = () => {
  const dispatch = useAppDispatch();
  const [searchRepoName, setSearchRepoName] = useState<string>('');
  const { repositories, loading, error, page, hasMore } = useAppSelector(
    (state: RootState) => state.gitRepo,
  );

  const onInputSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      setSearchRepoName(newValue);

      if (newValue.length > 2) {
        dispatch(fetchRepositoriesRequest({ searchName: e.target.value, page }));
      }
    },
    [dispatch, page],
  );
  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (hasMore && !loading && e.currentTarget.scrollTop >= e.currentTarget.clientHeight * 0.9) {
        dispatch(fetchRepositoriesRequest({ searchName: searchRepoName, page: page + 1 }));
      }
    },
    [dispatch, hasMore, loading, searchRepoName, page],
  );

  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      <div className="flex justify-center pt-5">
        <div className="w-full max-w-md">
          <div
            onScroll={handleScroll}
            className="relative mb-4 rounded-lg bg-white px-3 py-2 shadow-md overflow-y-auto max-h-[50vh] lg:max-h-[58vh] xl:max-h-[66vh] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 "
          >
            <div className="flex items-center rounded-md bg-gray-200 sticky top-0">
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
                />
              </Tooltip>
            </div>
            <div className="text-sm">
              {error ? (
                <div className="my-2 flex justify-start rounded-md p-2 text-red-700">
                  <span className="grow px-2 font-medium">
                    Oops! Something went wrong, please try again later!
                  </span>
                </div>
              ) : (
                repositories.map((repo) => <RepoListItem key={repo.id} repo={repo} />)
              )}
              {loading && <RepoListItemLoader />}
            </div>
            {!loading && hasMore && (
              <div className="animate-bounce sticky bottom-0 flex justify-center">
                <img src={arrowDownIcon} className="size-6" alt="React logo" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoList;
