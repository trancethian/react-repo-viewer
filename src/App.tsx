import { Typography } from '@material-tailwind/react';

import reactLogo from './assets/react.svg';
import RepoList from './components/RepoList/RepoList';
import SessionInfo from './components/SessionInfo/GitSessionInfo';

import './App.css';

function App() {
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
      <Typography className="text-white [text-shadow:_0_4px_8px_rgb(0_0_0_/_0.8)]" variant="h1">
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
      <RepoList />
    </>
  );
}

export default App;
