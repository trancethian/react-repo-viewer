import { useEffect } from 'react';

import { Typography } from '@material-tailwind/react';

import reactLogo from './assets/react.svg';
import RateLimitAlert from './components/RateLimitAlert/RateLimitAlert';
import RepoList from './components/RepoList/RepoList';
import SessionInfo from './components/SessionInfo/GitSessionInfo';
import { fetchGitSessionRequest } from './redux/gitSession/slice';
import { useAppDispatch } from './redux/hooks';

import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGitSessionRequest());
  }, [dispatch]);

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
        variant="h2"
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
      <div className="mx-auto flex w-full max-w-screen-sm text-left mb-4">
        <RateLimitAlert />
      </div>
      <RepoList />
    </>
  );
}

export default App;
