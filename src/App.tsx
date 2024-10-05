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
      <div>
        <RepoList />
      </div>
    </>
  );
}

export default App;
