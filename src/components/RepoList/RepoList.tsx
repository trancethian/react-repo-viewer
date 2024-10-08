import { ChangeEvent, UIEvent, useCallback, useState } from 'react';

import arrowDownIcon from '@/assets/arrow-down-circle.svg';
import { Tooltip, Typography } from '@material-tailwind/react';

import { fetchRepositoriesRequest } from '../../redux/gitRepo/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

import ErrorMessage from './ErrorMessage';
import RepoListItem from './ListItem';
import RepoListItemLoader from './Loader';
import NoResultMessage from './NoResultMessage';

const RepoList = () => {
  const dispatch = useAppDispatch();
  const [searchRepoName, setSearchRepoName] = useState<string>('');
  const { repositories, loading, error, page, hasMore, noResult } = useAppSelector(
    (state: RootState) => state.gitRepo,
  );
  const { rateRemaining, rateLimitReached } = useAppSelector(
    (state: RootState) => state.gitSession,
  );

  const onInputSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      setSearchRepoName(newValue);

      if (newValue.length > 2) {
        dispatch(fetchRepositoriesRequest({ searchName: e.target.value, page: 1 }));
      }
    },
    [dispatch],
  );
  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (
        !rateLimitReached &&
        hasMore &&
        !loading &&
        e.currentTarget.scrollTop == e.currentTarget.scrollHeight - e.currentTarget.offsetHeight
      ) {
        dispatch(fetchRepositoriesRequest({ searchName: searchRepoName, page: page + 1 }));
      }
    },
    [dispatch, rateLimitReached, hasMore, loading, searchRepoName, page],
  );

  return (
    <div className="mx-auto w-full flex flex-col justify-center max-w-2xl relative mb-4 rounded-lg bg-white py-1 shadow-md overflow-hidden">
      <div className="flex items-center rounded-md bg-gray-200 sticky top-0 z-10 m-2">
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
            <Typography className="text-xs">Type at least 3 letters to begin searching</Typography>
          }
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          placement="top-start"
        >
          <input
            className="w-full rounded-md bg-gray-200 p-2 leading-tight text-gray-700 focus:outline-none disabled:hover:cursor-not-allowed"
            id="search"
            type="text"
            placeholder="Search Repo Name"
            maxLength={256}
            value={searchRepoName}
            onChange={onInputSearch}
            disabled={!!error || rateRemaining == 0}
          />
        </Tooltip>
      </div>
      <div
        onScroll={handleScroll}
        className="text-sm overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300"
      >
        {loading && <RepoListItemLoader show={loading} />}
        {error && <ErrorMessage />}
        {!loading && noResult ? (
          <NoResultMessage />
        ) : (
          repositories.map((repo) => <RepoListItem key={repo.id} repo={repo} />)
        )}
        {!rateLimitReached && repositories.length > 0 && hasMore && (
          <RepoListItemLoader show={loading} />
        )}
      </div>
      {!rateLimitReached && !loading && repositories.length > 0 && hasMore && (
        <div className="animate-bounce absolute mx-auto left-0 right-0 bottom-0 flex justify-center">
          <img src={arrowDownIcon} className="size-6" alt="Scroll down" />
        </div>
      )}
    </div>
  );
};

export default RepoList;
