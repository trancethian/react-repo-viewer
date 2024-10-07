import { useEffect, useState } from 'react';

import { Button, Typography } from '@material-tailwind/react';

import reactLogo from './assets/react.svg';
import { parseToDate } from './common/helpers';
import CustomAlert from './components/common/CustomAlert';
import RepoList from './components/RepoList/RepoList';
import SessionInfo from './components/SessionInfo/GitSessionInfo';
import { API_LIMIT_REACHED } from './constants/api';
import { fetchGitSessionRequest } from './redux/gitSession/slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { RootState } from './redux/store';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.gitRepo);
  const { rateRemaining, rateResetTimestamp } = useAppSelector(
    (state: RootState) => state.gitSession,
  );
  const [rateLimitReached, setRateLimitReached] = useState(false);

  useEffect(() => {
    if (error && error.type == API_LIMIT_REACHED) {
      setRateLimitReached(true);
    } else if (rateRemaining !== undefined) {
      setRateLimitReached(rateRemaining <= 0);
    } else {
      setRateLimitReached(false);
    }
  }, [rateRemaining, error]);

  return (
    <>
      <div className="flex justify-between">
        <div className="inline-flex">
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <div>
          <SessionInfo />
        </div>
      </div>
      <Typography
        className="text-white mb-4 [text-shadow:_0_4px_8px_rgb(0_0_0_/_0.8)]"
        variant="h1"
      >
        <a
          className="hover:underline"
          href="https://github.com/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          React
        </a>{' '}
        Open Source Repositories
      </Typography>
      <div className="mx-auto flex w-full max-w-screen-sm text-left">
        <CustomAlert open={rateLimitReached}>
          <Typography className="font-medium">
            {"Uh oh! You've hit the Rate Limit. Please try again later."}
          </Typography>
          <ul className="my-2 ml-2 list-inside list-disc">
            {rateResetTimestamp && (
              <li>You can refresh your limit on {parseToDate(rateResetTimestamp)}</li>
            )}
          </ul>
          <Button onClick={() => dispatch(fetchGitSessionRequest())}>Refresh Limit</Button>
        </CustomAlert>
      </div>
      <RepoList />
    </>
  );
}

export default App;
